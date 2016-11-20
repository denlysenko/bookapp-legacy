'use strict';

var _express = require('express');

var _history = require('./history.controller');

var controller = _interopRequireWildcard(_history);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', auth.isAuthenticated(), controller.getAll);
router.post('/', auth.isAuthenticated(), controller.save);

module.exports = router;
//# sourceMappingURL=index.js.map
