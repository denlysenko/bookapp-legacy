'use strict';

/**
* Module dependencies
**/

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var CommentSchema = new Schema({
	author: {
		type: String,
		required: 'Author is required'
	},
	body: {
		type: String,
		required: 'Comment text is required'
	},
	created: {
		type: Date,
		default: Date.now
	},
	book: {
		type: Schema.ObjectId
	}
});		

mongoose.model('Comment', CommentSchema);