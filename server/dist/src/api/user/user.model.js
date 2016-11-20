'use strict';
/*eslint no-invalid-this:0*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');

/**
* A Validation function for local strategy properties
*/
var validateLocalStrategyProperty = function validateLocalStrategyProperty(property) {
  return this.provider !== 'local' && !this.updated || property.length;
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function validateLocalStrategyPassword(password) {
  return this.provider !== 'local' || password && password.length > 6;
};

var UserSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please, fill in your First Name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please, fill in your Last Name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your Email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should contain at least 6 characters']
  },
  salt: String,
  provider: String,
  avatarUrl: {
    type: String,
    default: '/fs/avatars/default-avatar.png'
  },
  roles: {
    type: [{ type: String, enum: ['user', 'admin'] }],
    default: ['user']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  reading: {
    epubUrl: {
      type: String,
      default: ''
    },
    bookmark: {
      type: String,
      default: ''
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Virtuals
 */

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function () {
  return {
    _id: this._id
  };
});

/**
 * Validations
 */

// Validate email is not taken
UserSchema.path('email').validate(function (value, respond) {
  var _this = this;

  return this.constructor.findOne({ email: value }).exec().then(function (user) {
    if (user) {
      if (_this.id === user.id) {
        return respond(true);
      }
      return respond(false);
    }
    return respond(true);
  }).catch(function (err) {
    throw err;
  });
}, 'The specified email address is already in use.');

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  var _this2 = this;

  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next();
  }

  // Make salt with a callback
  this.makeSalt(function (saltErr, salt) {
    if (saltErr) {
      return next(saltErr);
    }
    _this2.salt = salt;
    _this2.encryptPassword(_this2.password, function (encryptErr, hashedPassword) {
      if (encryptErr) {
        return next(encryptErr);
      }
      _this2.password = hashedPassword;
      return next();
    });
  });
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate: function authenticate(password, callback) {
    var _this3 = this;

    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, function (err, pwdGen) {
      if (err) {
        return callback(err);
      }

      if (_this3.password === pwdGen) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
  },


  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt: function makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    return _crypto2.default.randomBytes(byteSize, function (err, salt) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, salt.toString('base64'));
      }
    });
  },


  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword: function encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return _crypto2.default.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512').toString('base64');
    }

    return _crypto2.default.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', function (err, key) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, key.toString('base64'));
      }
    });
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map
