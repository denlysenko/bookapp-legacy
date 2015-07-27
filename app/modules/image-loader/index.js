'use strict';

var lwip = require('lwip'),
		fs = require('fs'),
		normalize = require('path').normalize,
		async = require('async'),
		HttpError = require('../error').HttpError;

exports.load = function(path, options, callback) {
	lwip.open(path, function(err, img) {
		if(err) return callback(err);

		async.series([
			function(callback) {
				img.resize(options.width, options.height, function(err, img) {
					if(err) return callback(err);
					var index = path.indexOf('tmp');
					var pathTmp = path.slice(index + 3); 
					var pathImg = normalize(__dirname + '../../../../public' + options.pathTo + pathTmp);
					console.log(pathImg);
					img.writeFile(pathImg, function(err) {
						if(err) return callback(err);
						var index = pathImg.indexOf('modules');
						pathImg = pathImg.slice(index - 1);
						callback(null, pathImg);
					});
				});
			},
			function(callback) {
				fs.unlink(path, callback);
			}
		], function(err, results) {
			if(err) return callback(err);
			callback(null, results[0]);
		});
	});
};

exports.remove = function(image, callback) {
	var path = normalize(__dirname + '../../../../public' + image);
	fs.unlink(path, callback);
};