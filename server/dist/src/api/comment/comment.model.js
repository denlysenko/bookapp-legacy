'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');


var CommentSchema = new _mongoose.Schema({
  bookId: _mongoose.Schema.Types.ObjectId,
  messages: [{
    author: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    text: String
  }]
});

exports.default = _mongoose2.default.model('Comment', CommentSchema);
//# sourceMappingURL=comment.model.js.map
