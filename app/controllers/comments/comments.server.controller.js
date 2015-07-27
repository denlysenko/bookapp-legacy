'use strict';

var mongoose = require('mongoose'),
		Comment = mongoose.model('Comment');

exports.add = function(req, res) {
	var comment = new Comment(req.body);
	comment._book = req.params.bookId;

	comment.save(function(err) {
		if(err) {
			return res.status(400).send({
				message: err.message
			});
		}
		res.json(comment);
	});
};