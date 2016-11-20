'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.add = add;
exports.remove = remove;

var _favourite = require('./favourite.model');

var _favourite2 = _interopRequireDefault(_favourite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * get favourites by user
 */
function get(req, res) {
  return _favourite2.default.findOne({ userId: req.user._id }).populate('books').exec().then(function (favourite) {
    res.json(favourite);
  }).catch(handleError(res));
}

/**
 * adds book to favourites
 */
function add(req, res) {
  var bookId = req.body.bookId;
  if (!bookId) {
    return res.status(400).json({ message: 'Book Not Provided' });
  }

  return _favourite2.default.findOne({ userId: req.user._id }).exec().then(function (favourite) {
    if (favourite) {
      if (favourite.books.indexOf(bookId) > -1) {
        return res.status(400).json({ message: 'Book is already in Favourites' });
      }

      favourite.books.push(bookId);
      return favourite.save();
    } else {
      var newFavourite = new _favourite2.default({
        userId: req.user._id,
        books: [bookId]
      });
      return newFavourite.save();
    }
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}

/**
 * removes book from favourites
 */
function remove(req, res) {
  var userId = req.user._id,
      bookId = req.params.id;
  return _favourite2.default.findOne({ userId: userId }).exec().then(function (favourite) {
    var index = favourite.books.indexOf(bookId);

    if (index === -1) {
      return res.status(400).json({ message: 'Book Not Found in Your Favourite List' });
    }

    favourite.books.splice(index, 1);
    return favourite.save();
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}
//# sourceMappingURL=favourite.controller.js.map
