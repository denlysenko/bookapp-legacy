/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use((0, _cors2.default)());
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/wishlist', require('./api/wishlist'));
  app.use('/api/favourite', require('./api/favourite'));
  app.use('/api/mustread', require('./api/mustread'));
  app.use('/api/history', require('./api/history'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
