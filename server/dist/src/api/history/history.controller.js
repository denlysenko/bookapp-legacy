'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.save = save;

var _history = require('./history.model');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * Gets all actions by user, optionally limited
 */
function getAll(req, res) {
  return _history2.default.findOne({ userId: req.user._id }).exec().then(function (history) {
    res.json(history);
  }).catch(handleError(res));
}

/**
 * Creates new history if not exists or add new action if exists
 */
function save(req, res) {
  var userId = req.user._id;
  return _history2.default.findOne({ userId: userId }).exec().then(function (history) {
    if (history) {
      history.actions.push({ desc: req.body.desc });
      return history.save();
    } else {
      var newHistory = new _history2.default({
        userId: userId,
        actions: [{ desc: req.body.desc }]
      });
      return newHistory.save();
    }
  }).then(function (history) {
    res.json(history);
  }).catch(handleError(res));
}
//# sourceMappingURL=history.controller.js.map
