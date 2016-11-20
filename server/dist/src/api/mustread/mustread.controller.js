'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.add = add;
exports.remove = remove;

var _mustread = require('./mustread.model');

var _mustread2 = _interopRequireDefault(_mustread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * get mustreads by user
 */
function get(req, res) {
  return _mustread2.default.findOne({ userId: req.user._id }).populate('books').exec().then(function (mustread) {
    res.json(mustread);
  }).catch(handleError(res));
}

/**
 * adds book to mustreads
 */
function add(req, res) {
  var bookId = req.body.bookId;
  if (!bookId) {
    return res.status(400).json({ message: 'Book Not Provided' });
  }

  return _mustread2.default.findOne({ userId: req.user._id }).exec().then(function (mustread) {
    if (mustread) {
      if (mustread.books.indexOf(bookId) > -1) {
        return res.status(400).json({ message: 'Book is already in Must Read Titles' });
      }

      mustread.books.push(bookId);
      return mustread.save();
    } else {
      var newMustread = new _mustread2.default({
        userId: req.user._id,
        books: [bookId]
      });
      return newMustread.save();
    }
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}

/**
 * removes book from mustreads
 */
function remove(req, res) {
  var userId = req.user._id,
      bookId = req.params.id;
  return _mustread2.default.findOne({ userId: userId }).exec().then(function (mustread) {
    var index = mustread.books.indexOf(bookId);

    if (index === -1) {
      return res.status(400).json({ message: 'Book Not Found in Your Must Read List' });
    }

    mustread.books.splice(index, 1);
    return mustread.save();
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}
//# sourceMappingURL=mustread.controller.js.map
