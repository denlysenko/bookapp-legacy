'use strict';

var _express = require('express');

var _book = require('./book.controller');

var controller = _interopRequireWildcard(_book);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', auth.isAuthenticated(), controller.getAll);
router.get('/best_books', auth.isAuthenticated(), controller.getBest);
router.get('/:slug', auth.isAuthenticated(), controller.getBySlug);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:slug', auth.hasRole('admin'), controller.update);
router.delete('/:slug', auth.hasRole('admin'), controller.remove);
router.put('/:slug/cover', auth.hasRole('admin'), controller.changeCover);
router.put('/:slug/epub', auth.hasRole('admin'), controller.changeEpub);
router.put('/:id/rate', auth.isAuthenticated(), controller.rate);
router.post('/:id/buy', auth.isAuthenticated(), controller.sendLink);
router.get('/download/:url', auth.isAuthenticated(), controller.download);

module.exports = router;
//# sourceMappingURL=index.js.map
