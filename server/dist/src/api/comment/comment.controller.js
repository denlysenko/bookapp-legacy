'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.save = save;

var _comment = require('./comment.model');

var _comment2 = _interopRequireDefault(_comment);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * gets all comments for book
 */
function getAll(req, res) {
  return _comment2.default.findOne({ bookId: req.params.bookId }).populate({
    path: 'messages.author',
    select: 'displayName',
    model: _user2.default
  }).exec().then(function (comment) {
    res.json(comment);
  }).catch(handleError(res));
}

/**
 * Saves new comment from book
 */
function save(req, res) {
  return _comment2.default.findOne({ bookId: req.params.bookId }).exec().then(function (comment) {
    if (comment) {
      comment.messages.push({
        author: req.user._id,
        created_at: Date.now(),
        text: req.body.comment
      });

      return comment.save();
    } else {
      var newComment = new _comment2.default({
        bookId: req.params.bookId,
        messages: [{
          author: req.user._id,
          text: req.body.comment
        }]
      });

      return newComment.save();
    }
  }).then(function (comment) {
    return comment.populate({
      path: 'messages.author',
      select: 'displayName',
      model: _user2.default
    }).execPopulate();
  }).then(function (comment) {
    res.json(comment);
  }).catch(handleError(res));
}
//# sourceMappingURL=comment.controller.js.map
