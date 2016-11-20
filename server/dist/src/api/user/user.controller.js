'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.update = update;
exports.changePassword = changePassword;
exports.changeAvatar = changeAvatar;
exports.forgot = forgot;
exports.reset = reset;
exports.me = me;
exports.authCallback = authCallback;

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _images = require('../../components/images');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = _bluebird2.default.promisifyAll(require('crypto'));

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

/**
 * Creates a new user
 */
function create(req, res) {
  var newUser = new _user2.default(req.body);
  newUser.provider = 'local';
  newUser.displayName = newUser.firstName + ' ' + newUser.lastName;
  newUser.save().then(function (user) {
    var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token: token });
  }).catch(validationError(res));
}

/**
 * Updates an existing user
 */
function update(req, res) {
  var userId = req.user._id;
  return _user2.default.findById(userId, '-salt -password').exec().then(function (user) {
    _.extend(user, req.body);
    user.displayName = user.firstName + ' ' + user.lastName;
    return user.save();
  }).then(function (user) {
    res.json(user);
  }).catch(validationError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return _user2.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(function () {
        res.status(200).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).json({ message: 'Current password is incorrect!' });
    }
  });
}

/**
 * Change a user's avatar
 */
function changeAvatar(req, res) {
  var userId = req.user._id;

  return _user2.default.findById(userId).exec().then(function (user) {
    // if there is avatar
    if (req.files.file) {
      // check if files have valid mimetype
      if (req.files.file.mimetype.indexOf('jpeg') === -1 && req.files.file.mimetype.indexOf('png') === -1) {
        return res.status(400).send({
          message: 'Image should be in JPEG or PNG format'
        });
      }

      if (user.avatarUrl.indexOf('default-avatar') > -1) {
        return (0, _images.loadImage)(req.files.file.path, {
          width: 30,
          height: 30,
          pathTo: '/avatars'
        }).then(function (imgPath) {
          user.avatarUrl = imgPath;
          return user.save();
        }).then(function (user) {
          res.end(user.avatarUrl);
        }).catch(handleError(res));
      } else {
        return (0, _images.removeImage)(user.avatarUrl).then(function () {
          return (0, _images.loadImage)(req.files.file.path, {
            width: 30,
            height: 30,
            pathTo: '/avatars'
          }).then(function (imgPath) {
            user.avatarUrl = imgPath;
            return user.save();
          }).then(function (user) {
            res.end(user.avatarUrl);
          });
        }).catch(handleError(res));
      }
    } else {
      res.status(400).send({
        message: 'No File Provided'
      });
    }
  }).catch(handleError(res));
}

/**
 * Forgot password: check if email is exist
 */
function forgot(req, res) {
  var token = void 0;
  return _user2.default.findOne({ email: req.body.email }).exec().then(function (user) {
    if (!user) {
      return res.status(401).json({ message: 'Email not found!' });
    } else {
      return crypto.randomBytesAsync(20).then(function (buffer) {
        token = buffer.toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        return user.save();
      }).then(function () {
        res.json({ token: token });
      }).catch(handleError(res));
    }
  }).catch(handleError(res));
}

/**
 * Reset old password, save new password
 */
function reset(req, res) {
  return _user2.default.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    } }).exec().then(function (user) {
    if (!user) {
      return res.status(401).json({ message: 'Token not found!' });
    } else {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      return user.save().then(function (user) {
        var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
          expiresIn: 60 * 60 * 5
        });
        res.json({ token: token });
      });
    }
  }).catch(handleError(res));
}

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * Authentication callback
 */
function authCallback(req, res) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
