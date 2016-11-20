'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

;
//# sourceMappingURL=index.js.map
