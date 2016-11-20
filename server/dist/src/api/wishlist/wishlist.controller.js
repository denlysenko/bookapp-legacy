'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.add = add;
exports.remove = remove;

var _wishlist = require('./wishlist.model');

var _wishlist2 = _interopRequireDefault(_wishlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * get wishlist by user
 */
function get(req, res) {
  return _wishlist2.default.findOne({ userId: req.user._id }).populate('books').exec().then(function (wishlist) {
    res.json(wishlist);
  }).catch(handleError(res));
}

/**
 * adds book to wishlist
 */
function add(req, res) {
  var bookId = req.body.bookId;
  if (!bookId) {
    return res.status(400).json({ message: 'Book Not Provided' });
  }

  return _wishlist2.default.findOne({ userId: req.user._id }).exec().then(function (wishlist) {
    if (wishlist) {
      if (wishlist.books.indexOf(bookId) > -1) {
        return res.status(400).json({ message: 'Book is already in Wishlist' });
      }
      wishlist.books.push(bookId);
      return wishlist.save();
    } else {
      var newWishlist = new _wishlist2.default({
        userId: req.user._id,
        books: [bookId]
      });

      return newWishlist.save();
    }
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}

/**
 * removes book from wishlist
 */
function remove(req, res) {
  var userId = req.user._id,
      bookId = req.params.id;
  return _wishlist2.default.findOne({ userId: userId }).exec().then(function (wishlist) {
    var index = wishlist.books.indexOf(bookId);

    if (index === -1) {
      return res.status(400).json({ message: 'Book Not Found in Your Wishlist' });
    }

    wishlist.books.splice(index, 1);
    return wishlist.save();
  }).then(function () {
    res.end();
  }).catch(handleError(res));
}
//# sourceMappingURL=wishlist.controller.js.map
