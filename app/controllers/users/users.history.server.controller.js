'use strict';

var mongoose = require('mongoose'),
		User = mongoose.model('User');

exports.history = function(req, res) {
	User.findById(req.user._id, function(err, user) {
		if(err) {
			return res.status(400).json({
				message: err.message
			});
		}
		res.send(user.history);
	});
};

exports.saveReading = function(req, res) {
	User.findByIdAndUpdate(req.user._id, {reading: req.body.link}, function(err) {
		if(err) return res.sendStatus(500);
		res.end();
	});
};		

exports.getReading = function(req, res) {
	User.findById(req.user._id, function(err, user) {
		if(err) return res.sendStatus(404);
		res.send(user.reading);
	});
};