'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.getBest = getBest;
exports.getBySlug = getBySlug;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.changeCover = changeCover;
exports.changeEpub = changeEpub;
exports.rate = rate;
exports.sendLink = sendLink;
exports.download = download;

var _book = require('./book.model');

var _book2 = _interopRequireDefault(_book);

var _images = require('../../components/images');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(require('fs'));
var normalize = require('path').normalize;

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * Gets book's list optionally filtered
 */
function getAll(req, res) {
  var query = _url2.default.parse(req.url, true).query,
      filter = { paid: query.paid === 'true' },
      sortBy = void 0;

  if (query.search) {
    filter.$or = [{ title: new RegExp('^' + query.search, "i") }, { author: new RegExp('^' + query.search, "i") }];
  }

  if (query.sort) {
    sortBy = '-' + query.sort;
  } else {
    sortBy = 'title';
  }

  return _book2.default.find(filter).sort(sortBy).exec().then(function (books) {
    res.json(books);
  }).catch(handleError(res));
}

/**
 * Gets best by rating books
 */
function getBest(req, res) {
  return _book2.default.find({ rating: 5 }).sort('-added_at').exec().then(function (books) {
    res.json(books);
  }).catch(handleError(res));
}

/**
 * Gets book by slug
 */
function getBySlug(req, res) {
  return _book2.default.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } }).exec().then(function (book) {
    res.json(book);
  }).catch(handleError(res));
}

/**
 * Creates a new book
 */
function create(req, res) {
  var newBook = new _book2.default(req.body);

  newBook.save().then(function (book) {
    res.json(book);
  }).catch(validationError(res));
}

/**
 * Updates an existing book
 */
function update(req, res) {
  return _book2.default.findOne({ slug: req.params.slug }).exec().then(function (book) {
    _.extend(book, req.body);
    return book.save();
  }).then(function (book) {
    res.json(book);
  }).catch(validationError(res));
}

/**
 * Removes an existing book
 */
function remove(req, res) {
  var coverUrl = void 0,
      epubUrl = void 0;

  return _book2.default.findOne({ slug: req.params.slug }).exec().then(function (book) {
    coverUrl = book.coverUrl;
    epubUrl = book.epubUrl;
    return book.remove();
  }).then(function () {
    return (0, _images.removeImage)(coverUrl);
  }).then(function () {
    return fs.unlinkAsync(normalize(__dirname + '/../../..' + epubUrl));
  }).then(function () {
    res.end();
  }).catch(validationError(res));
}

/**
 * Updates a book's cover
 */
function changeCover(req, res) {
  return _book2.default.findOne({ slug: req.params.slug }).exec().then(function (book) {
    // check if files have valid mimetype
    if (req.files.file.mimetype.indexOf('jpeg') === -1 && req.files.file.mimetype.indexOf('png') === -1) {
      return res.status(400).send({
        message: 'Image should be in JPEG or PNG format'
      });
    }
    // if cover already exists, remove it first
    if (book.coverUrl) {
      return (0, _images.removeImage)(book.coverUrl).then(function () {
        return (0, _images.loadImage)(req.files.file.path, {
          width: 200,
          height: 275,
          pathTo: '/books/covers'
        }).then(function (imgPath) {
          book.coverUrl = imgPath;
          return book.save();
        }).then(function (book) {
          res.json(book);
        });
      }).catch(handleError(res));
    } else {
      return (0, _images.loadImage)(req.files.file.path, {
        width: 200,
        height: 275,
        pathTo: '/books/covers'
      }).then(function (imgPath) {
        book.coverUrl = imgPath;
        return book.save();
      }).then(function (book) {
        res.json(book);
      }).catch(handleError(res));
    }
  }).catch(handleError(res));
}

/**
 * Updates a book's epub
 */
function changeEpub(req, res) {
  var epubUrl = void 0;

  return _book2.default.findOne({ slug: req.params.slug }).exec().then(function (book) {
    // check if files have valid mimetype
    if (req.files.file.mimetype.indexOf('epub') === -1) {
      return res.status(400).send({
        message: 'Image should be in EPUB format'
      });
    }

    // if there is epub file, remove it first
    if (book.epubUrl) {
      return fs.unlinkAsync(normalize(__dirname + '/../../..' + book.epubUrl)).then(function () {
        var index = req.files.file.path.indexOf('uploads');
        var tmpPath = req.files.file.path.slice(index + 7);
        var epubPath = normalize(__dirname + '/../../../fs/books/epubs' + tmpPath);
        epubUrl = '/fs/books/epubs' + tmpPath;
        return fs.renameAsync(req.files.file.path, epubPath);
      }).then(function () {
        book.epubUrl = epubUrl;
        return book.save();
      }).then(function (book) {
        res.json(book);
      }).catch(handleError(res));
    } else {
      var index = req.files.file.path.indexOf('uploads');
      var tmpPath = req.files.file.path.slice(index + 7);
      var epubPath = normalize(__dirname + '/../../../fs/books/epubs' + tmpPath);
      epubUrl = '/fs/books/epubs' + tmpPath;
      return fs.renameAsync(req.files.file.path, epubPath).then(function () {
        book.epubUrl = epubUrl;
        return book.save();
      }).then(function (book) {
        res.json(book);
      }).catch(handleError(res));
    }
  }).catch(handleError(res));
}

/**
 * Updates rating to book
 */
function rate(req, res) {
  return _book2.default.findById(req.params.id).exec().then(function (book) {
    var total_rates = book.total_rates + 1;
    var total_rating = book.total_rating + req.body.rating;
    var rating = Math.ceil(total_rating / total_rates);
    book.total_rates = total_rates;
    book.total_rating = total_rating;
    book.rating = rating;
    return book.save();
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}

// check credit card and send link for downloading
function sendLink(req, res) {
  // checking credit card number req.body.card
  // if(req.body.card) isValid, start downloading
  return _book2.default.findById(req.params.id).exec().then(function (book) {
    if (!book) {
      return res.status(404).json({ message: 'Book Not Found!' });
    }
    res.json({ url: book.epubUrl });
  }).catch(handleError);
}

// downloads file
function download(req, res) {
  var file = normalize(__dirname + '../../../../' + req.params.url);
  res.download(file);
}
//# sourceMappingURL=book.controller.js.map
