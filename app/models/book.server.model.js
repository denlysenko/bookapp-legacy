'use strict';

/**
* Module Dependencies
**/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    slugify = require('../modules/slugify');

// TODO rating calculator, i.e. total_rating/total_rates. Update these two fields    

var BookSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
    trim: true
  },
  author: {
    type: String,
    required: 'Author is required',
    trim: true
  },
  cover: {
    type: String,
    default: ''
  },
  epub: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String
  },
  total_rating: {
    type: Number,
    default: 0
  },
  total_rates: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  added: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  paid: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  }
});

// makes slug for book before saving
BookSchema.pre('save', function(next) {
  this.slug = slugify(this.title);
  next();
});

BookSchema.virtual('url').get(function() {
  return slugify(this.author) + '/' + this.slug;
});

// to access virtual property from Angular
BookSchema.set('toJSON', {virtuals: true});

mongoose.model('Book', BookSchema);
