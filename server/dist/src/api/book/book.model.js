'use strict';
/*eslint no-invalid-this:0*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slugify = require('../../components/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');

var BookSchema = new _mongoose.Schema({
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
  coverUrl: {
    type: String,
    default: ''
  },
  epubUrl: {
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
  added_at: {
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
BookSchema.pre('save', function (next) {
  this.slug = (0, _slugify2.default)(this.title);
  next();
});

BookSchema.virtual('url').get(function () {
  return (0, _slugify2.default)(this.author) + '/' + this.slug;
});

// to access virtual property from Angular
BookSchema.set('toJSON', { virtuals: true });

exports.default = _mongoose2.default.model('Book', BookSchema);
//# sourceMappingURL=book.model.js.map
