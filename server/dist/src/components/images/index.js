'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImage = loadImage;
exports.removeImage = removeImage;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lwip = _bluebird2.default.promisifyAll(require('lwip'));
_bluebird2.default.promisifyAll(require('lwip/lib/Image').prototype);
_bluebird2.default.promisifyAll(require('lwip/lib/Batch').prototype);
var fs = _bluebird2.default.promisifyAll(require('fs'));
var normalize = require('path').normalize;

function loadImage(path, options) {
  var imgPath = void 0;
  return new _bluebird2.default(function (resolve, reject) {
    return lwip.openAsync(path).then(function (img) {
      return img.resizeAsync(options.width, options.height);
    }).then(function (img) {
      var index = path.indexOf('uploads');
      var tmpPath = path.slice(index + 7);
      imgPath = normalize(__dirname + '/../../../fs' + options.pathTo + tmpPath);
      return img.writeFileAsync(imgPath);
    }).then(function () {
      return fs.unlinkAsync(path);
    }).then(function () {
      resolve(imgPath.slice(imgPath.indexOf('fs') - 1));
    }).catch(function (err) {
      return reject(err);
    });
  });
}

function removeImage(imageUrl) {
  return new _bluebird2.default(function (resolve, reject) {
    var path = normalize(__dirname + '/../../..' + imageUrl);
    return fs.unlinkAsync(path).then(function () {
      resolve();
    }).catch(function (err) {
      return reject(err);
    });
  });
}
//# sourceMappingURL=index.js.map
