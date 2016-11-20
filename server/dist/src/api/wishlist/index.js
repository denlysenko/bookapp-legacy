'use strict';

var _express = require('express');

var _wishlist = require('./wishlist.controller');

var controller = _interopRequireWildcard(_wishlist);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', auth.isAuthenticated(), controller.get);
router.post('/', auth.isAuthenticated(), controller.add);
router.delete('/:id', auth.isAuthenticated(), controller.remove);

module.exports = router;
//# sourceMappingURL=index.js.map
