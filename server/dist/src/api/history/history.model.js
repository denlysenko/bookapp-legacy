'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');


// TODO refactor Schema to make possible to fetch history by portions

var HistorySchema = new _mongoose.Schema({
  userId: _mongoose.Schema.Types.ObjectId,
  actions: [{
    desc: String,
    committed_at: {
      type: Date,
      default: Date.now
    }
  }]
});

exports.default = _mongoose2.default.model('History', HistorySchema);
//# sourceMappingURL=history.model.js.map
