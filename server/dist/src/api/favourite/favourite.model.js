'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');


var FavouriteSchema = new _mongoose.Schema({
  userId: _mongoose.Schema.Types.ObjectId,
  books: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

exports.default = _mongoose2.default.model('Favourite', FavouriteSchema);
//# sourceMappingURL=favourite.model.js.map
