'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	async = require('async'),
	imageLoader = require('../../modules/image-loader');

/**
 * Update user details
 */
exports.update = function(req, res, next) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		if(req.files.file) {
			// check if files have valid mimetype
			if(req.files.file.mimetype.indexOf('jpeg') === -1 && req.files.file.mimetype.indexOf('png') === -1) {
				return res.status(400).json({
					message: 'Image should be in JPEG or PNG format'
				});
			}
			async.series([
				// remove existing(current) avatar if not a default
				function(done) {
					if(user.avatar.indexOf('default') === -1) {
						imageLoader.remove(user.avatar, done);
					} else {
						done();
					}
				},
				//save new avatar
				function(done) {
					imageLoader.load(req.files.file.path, {
						width: 30,
						height: 30,
						pathTo: '/modules/users/img/avatars'
					}, function(err, pathTo) {
						if(err) return done(err);
						done(null, pathTo);
					});
				}
			], function(err, results) {
				// save other changes
				if(err) return res.status(400).json({message: err.message});

				user.avatar = results[1]; // path to new avatar
				// here I'm using update insted of save because of an error when document saving (cast ObjectId in refs)
				user.update({$set: user.toObject()}, function(err) {
					if (err) {
						return res.status(400).json({message: err.message});
					} else {
						req.login(user, function(err) {
							if (err) {
								res.status(500).send(err);
							} else {
								res.json(user);
							}
						});
					}
				});
			});
		} else {
			user.update({$set: user.toObject()}, function(err) {
				if (err) {
					return res.status(400).json({message: err.message});
				} else {
					req.login(user, function(err) {
						if (err) {
							res.status(500).send(err);
						} else {
							res.json(user);
						}
					});
				}
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};