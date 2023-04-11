/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "KEY_NOT_FOUND": () => (/* reexport */ KEY_NOT_FOUND),
  "ONE_KEY_DELETE_NONCE": () => (/* reexport */ ONE_KEY_DELETE_NONCE),
  "ONE_KEY_NAMESPACE": () => (/* reexport */ ONE_KEY_NAMESPACE),
  "Point": () => (/* reexport */ base_Point),
  "PointHex": () => (/* reexport */ rss_client_namespaceObject.PointHex),
  "Polynomial": () => (/* reexport */ base_Polynomial),
  "PublicPolynomial": () => (/* reexport */ base_PublicPolynomial),
  "PublicShare": () => (/* reexport */ base_PublicShare),
  "RSSClient": () => (/* reexport */ rss_client_namespaceObject.RSSClient),
  "SHARE_DELETED": () => (/* reexport */ SHARE_DELETED),
  "Share": () => (/* reexport */ base_Share),
  "ShareStore": () => (/* reexport */ base_ShareStore),
  "TkeyError": () => (/* reexport */ TkeyError),
  "decrypt": () => (/* reexport */ decrypt),
  "derivePubKeyXFromPolyID": () => (/* reexport */ derivePubKeyXFromPolyID),
  "ecCurve": () => (/* reexport */ ecCurve),
  "ecPoint": () => (/* reexport */ rss_client_namespaceObject.ecPoint),
  "encrypt": () => (/* reexport */ encrypt),
  "generateAddressFromPublicKey": () => (/* reexport */ generateAddressFromPublicKey),
  "generateID": () => (/* reexport */ generateID),
  "generatePrivateExcludingIndexes": () => (/* reexport */ generatePrivateExcludingIndexes),
  "getPubKeyEC": () => (/* reexport */ getPubKeyEC),
  "getPubKeyECC": () => (/* reexport */ getPubKeyECC),
  "getPubKeyPoint": () => (/* reexport */ getPubKeyPoint),
  "hexPoint": () => (/* reexport */ rss_client_namespaceObject.hexPoint),
  "isEmptyObject": () => (/* reexport */ isEmptyObject),
  "isErrorObj": () => (/* reexport */ isErrorObj),
  "normalize": () => (/* reexport */ normalize),
  "prettyPrintError": () => (/* reexport */ prettyPrintError),
  "randomSelection": () => (/* reexport */ rss_client_namespaceObject.randomSelection),
  "stripHexPrefix": () => (/* reexport */ stripHexPrefix),
  "toPrivKeyEC": () => (/* reexport */ toPrivKeyEC),
  "toPrivKeyECC": () => (/* reexport */ toPrivKeyECC)
});

;// CONCATENATED MODULE: external "@toruslabs/eccrypto"
const eccrypto_namespaceObject = require("@toruslabs/eccrypto");
;// CONCATENATED MODULE: external "bn.js"
const external_bn_js_namespaceObject = require("bn.js");
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "elliptic"
const external_elliptic_namespaceObject = require("elliptic");
;// CONCATENATED MODULE: external "serialize-error"
const external_serialize_error_namespaceObject = require("serialize-error");
;// CONCATENATED MODULE: external "web3-utils"
const external_web3_utils_namespaceObject = require("web3-utils");
;// CONCATENATED MODULE: ./src/utils.ts







// const privKeyBnToEcc = (bnPrivKey) => {
//   return bnPrivKey.toBuffer("be", 32);
// };

// const privKeyBnToPubKeyECC = (bnPrivKey) => {
//   return getPublic(privKeyBnToEcc(bnPrivKey));
// };

var ecCurve = new external_elliptic_namespaceObject.ec("secp256k1");

// Wrappers around ECC encrypt/decrypt to use the hex serialization
// TODO: refactor to take BN
function encrypt(_x, _x2) {
  return _encrypt.apply(this, arguments);
}
function _encrypt() {
  _encrypt = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(publicKey, msg) {
    var encryptedDetails;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,eccrypto_namespaceObject.encrypt)(publicKey, msg);
          case 2:
            encryptedDetails = _context.sent;
            return _context.abrupt("return", {
              ciphertext: encryptedDetails.ciphertext.toString("hex"),
              ephemPublicKey: encryptedDetails.ephemPublicKey.toString("hex"),
              iv: encryptedDetails.iv.toString("hex"),
              mac: encryptedDetails.mac.toString("hex")
            });
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _encrypt.apply(this, arguments);
}
function decrypt(_x3, _x4) {
  return _decrypt.apply(this, arguments);
}
function _decrypt() {
  _decrypt = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(privKey, msg) {
    var bufferEncDetails;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bufferEncDetails = {
              ciphertext: Buffer.from(msg.ciphertext, "hex"),
              ephemPublicKey: Buffer.from(msg.ephemPublicKey, "hex"),
              iv: Buffer.from(msg.iv, "hex"),
              mac: Buffer.from(msg.mac, "hex")
            };
            return _context2.abrupt("return", (0,eccrypto_namespaceObject.decrypt)(privKey, bufferEncDetails));
          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _decrypt.apply(this, arguments);
}
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
var isErrorObj = function isErrorObj(err) {
  return err && err.stack && err.message !== "";
};
function prettyPrintError(error) {
  if (isErrorObj(error)) {
    return error.message;
  }
  return JSON.stringify((0,external_serialize_error_namespaceObject.serializeError)(error));
}
function generateAddressFromPublicKey(publicKey) {
  var ethAddressLower = "0x".concat((0,external_web3_utils_namespaceObject.keccak256)(publicKey.toString("hex")).slice(64 - 38));
  return (0,external_web3_utils_namespaceObject.toChecksumAddress)(ethAddressLower);
}
function normalize(input) {
  if (!input) {
    return undefined;
  }
  var hexString;
  if (typeof input === "number") {
    hexString = input.toString(16);
    if (hexString.length % 2) {
      hexString = "0".concat(hexString);
    }
  }
  if (typeof input === "string") {
    hexString = input.toLowerCase();
  }
  return "0x".concat(hexString);
}
function generatePrivateExcludingIndexes(shareIndexes) {
  var key = new (external_bn_js_default())((0,eccrypto_namespaceObject.generatePrivate)());
  if (shareIndexes.find(function (el) {
    return el.eq(key);
  })) {
    return generatePrivateExcludingIndexes(shareIndexes);
  }
  return key;
}
var KEY_NOT_FOUND = "KEY_NOT_FOUND";
var SHARE_DELETED = "SHARE_DELETED";
function derivePubKeyXFromPolyID(polyID) {
  return polyID.split("|")[0].slice(2);
}
function stripHexPrefix(str) {
  if (str.slice(0, 2) === "0x") return str.slice(2);
  return str;
}
function generateID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "".concat(Math.random().toString(36).substr(2, 9));
}
;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: ./src/base/Point.ts





var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    classCallCheck_default()(this, Point);
    defineProperty_default()(this, "x", void 0);
    defineProperty_default()(this, "y", void 0);
    this.x = new (external_bn_js_default())(x, "hex");
    this.y = new (external_bn_js_default())(y, "hex");
  }
  createClass_default()(Point, [{
    key: "encode",
    value:
    // complies with EC and elliptic pub key types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function encode(enc, params) {
      switch (enc) {
        case "arr":
          return Buffer.concat([Buffer.from("0x04", "hex"), Buffer.from(this.x.toString("hex"), "hex"), Buffer.from(this.y.toString("hex"), "hex")]);
        case "elliptic-compressed":
          {
            // TODO: WHAT IS THIS.?
            var ec = params;
            ec = ecCurve;
            var key = ec.keyFromPublic({
              x: this.x.toString("hex"),
              y: this.y.toString("hex")
            }, "hex");
            return Buffer.from(key.getPublic(true, "hex"));
          }
        default:
          throw new Error("encoding doesnt exist in Point");
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        x: this.x.toString("hex"),
        y: this.y.toString("hex")
      };
    }
  }], [{
    key: "fromCompressedPub",
    value: function fromCompressedPub(value) {
      var key = ecCurve.keyFromPublic(value, "hex");
      var pt = key.getPublic();
      return new Point(pt.getX(), pt.getY());
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(value) {
      var x = value.x,
        y = value.y;
      return new Point(x, y);
    }
  }]);
  return Point;
}();
/* harmony default export */ const base_Point = (Point);
;// CONCATENATED MODULE: ./src/base/BNUtils.ts





// These functions are here because BN can't be extended
var toPrivKeyEC = function toPrivKeyEC(bn) {
  return ecCurve.keyFromPrivate(bn.toString("hex", 64));
};
var toPrivKeyECC = function toPrivKeyECC(bn) {
  var tmp = new (external_bn_js_default())(bn, "hex");
  return Buffer.from(tmp.toString("hex", 64), "hex");
};
var getPubKeyEC = function getPubKeyEC(bn) {
  return ecCurve.keyFromPrivate(bn.toString("hex", 64)).getPublic();
};
var getPubKeyECC = function getPubKeyECC(bn) {
  return (0,eccrypto_namespaceObject.getPublic)(toPrivKeyECC(bn));
};
var getPubKeyPoint = function getPubKeyPoint(bn) {
  var pubKeyEc = getPubKeyEC(bn);
  return new base_Point(pubKeyEc.getX().toString("hex"), pubKeyEc.getY().toString("hex"));
};
;// CONCATENATED MODULE: external "@babel/runtime/helpers/assertThisInitialized"
const assertThisInitialized_namespaceObject = require("@babel/runtime/helpers/assertThisInitialized");
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/inherits"
const inherits_namespaceObject = require("@babel/runtime/helpers/inherits");
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
const possibleConstructorReturn_namespaceObject = require("@babel/runtime/helpers/possibleConstructorReturn");
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/getPrototypeOf"
const getPrototypeOf_namespaceObject = require("@babel/runtime/helpers/getPrototypeOf");
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_namespaceObject);
;// CONCATENATED MODULE: external "ts-custom-error"
const external_ts_custom_error_namespaceObject = require("ts-custom-error");
;// CONCATENATED MODULE: ./src/base/Error.ts







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


// @flow

var TkeyError = /*#__PURE__*/function (_CustomError) {
  inherits_default()(TkeyError, _CustomError);
  var _super = _createSuper(TkeyError);
  function TkeyError(code, message) {
    var _this;
    classCallCheck_default()(this, TkeyError);
    // takes care of stack and proto
    _this = _super.call(this, message);
    defineProperty_default()(assertThisInitialized_default()(_this), "code", void 0);
    defineProperty_default()(assertThisInitialized_default()(_this), "message", void 0);
    _this.code = code;
    _this.message = message || "";
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(assertThisInitialized_default()(_this), "name", {
      value: "TkeyError"
    });
    return _this;
  }
  createClass_default()(TkeyError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        code: this.code,
        message: this.message
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return TkeyError;
}(external_ts_custom_error_namespaceObject.CustomError);
;// CONCATENATED MODULE: ./src/base/OneKey.ts
var ONE_KEY_DELETE_NONCE = "__ONE_KEY_DELETE_NONCE__";
var ONE_KEY_NAMESPACE = "noncev2";
;// CONCATENATED MODULE: ./src/base/PublicPolynomial.ts




var PublicPolynomial = /*#__PURE__*/function () {
  function PublicPolynomial(polynomialCommitments) {
    classCallCheck_default()(this, PublicPolynomial);
    defineProperty_default()(this, "polynomialCommitments", void 0);
    defineProperty_default()(this, "polynomialId", void 0);
    this.polynomialCommitments = polynomialCommitments;
  }
  createClass_default()(PublicPolynomial, [{
    key: "getThreshold",
    value: function getThreshold() {
      return this.polynomialCommitments.length;
    }
  }, {
    key: "getPolynomialID",
    value: function getPolynomialID() {
      var idSeed = "";
      for (var i = 0; i < this.polynomialCommitments.length; i += 1) {
        var nextChunk = this.polynomialCommitments[i].encode("elliptic-compressed").toString();
        if (i !== 0) {
          nextChunk = "|".concat(nextChunk);
        }
        idSeed += nextChunk;
      }
      this.polynomialId = idSeed;
      return this.polynomialId;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        polynomialCommitments: this.polynomialCommitments
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var points = value.polynomialCommitments.map(function (x) {
        return base_Point.fromJSON(x);
      });
      return new PublicPolynomial(points);
    }
  }]);
  return PublicPolynomial;
}(); // @flow
/* harmony default export */ const base_PublicPolynomial = (PublicPolynomial);
;// CONCATENATED MODULE: ./src/base/PublicShare.ts





var PublicShare = /*#__PURE__*/function () {
  function PublicShare(shareIndex, shareCommitment) {
    classCallCheck_default()(this, PublicShare);
    defineProperty_default()(this, "shareCommitment", void 0);
    defineProperty_default()(this, "shareIndex", void 0);
    this.shareCommitment = new base_Point(shareCommitment.x, shareCommitment.y);
    this.shareIndex = new (external_bn_js_default())(shareIndex, "hex");
  }
  createClass_default()(PublicShare, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        shareCommitment: this.shareCommitment,
        shareIndex: this.shareIndex.toString("hex")
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var shareCommitment = value.shareCommitment,
        shareIndex = value.shareIndex;
      return new PublicShare(shareIndex, base_Point.fromJSON(shareCommitment));
    }
  }]);
  return PublicShare;
}();
/* harmony default export */ const base_PublicShare = (PublicShare);
;// CONCATENATED MODULE: ./src/base/Share.ts






var Share = /*#__PURE__*/function () {
  function Share(shareIndex, share) {
    classCallCheck_default()(this, Share);
    defineProperty_default()(this, "share", void 0);
    defineProperty_default()(this, "shareIndex", void 0);
    this.share = new (external_bn_js_default())(share, "hex");
    this.shareIndex = new (external_bn_js_default())(shareIndex, "hex");
  }
  createClass_default()(Share, [{
    key: "getPublicShare",
    value: function getPublicShare() {
      return new base_PublicShare(this.shareIndex, getPubKeyPoint(this.share));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        share: this.share.toString("hex"),
        shareIndex: this.shareIndex.toString("hex")
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var share = value.share,
        shareIndex = value.shareIndex;
      return new Share(shareIndex, share);
    }
  }]);
  return Share;
}();
/* harmony default export */ const base_Share = (Share);
;// CONCATENATED MODULE: ./src/base/Polynomial.ts









// @flow
var Polynomial = /*#__PURE__*/function () {
  function Polynomial(polynomial) {
    classCallCheck_default()(this, Polynomial);
    defineProperty_default()(this, "polynomial", void 0);
    defineProperty_default()(this, "publicPolynomial", void 0);
    this.polynomial = polynomial;
  }
  createClass_default()(Polynomial, [{
    key: "getThreshold",
    value: function getThreshold() {
      return this.polynomial.length;
    }
  }, {
    key: "polyEval",
    value: function polyEval(x) {
      var tmpX = new (external_bn_js_default())(x, "hex");
      var xi = new (external_bn_js_default())(tmpX);
      var sum = new (external_bn_js_default())(0);
      sum = sum.add(this.polynomial[0]);
      for (var i = 1; i < this.polynomial.length; i += 1) {
        var tmp = xi.mul(this.polynomial[i]);
        sum = sum.add(tmp);
        sum = sum.umod(ecCurve.curve.n);
        xi = xi.mul(new (external_bn_js_default())(tmpX));
        xi = xi.umod(ecCurve.curve.n);
      }
      return sum;
    }
  }, {
    key: "generateShares",
    value: function generateShares(shareIndexes) {
      var newShareIndexes = shareIndexes.map(function (index) {
        if (typeof index === "number") {
          return new (external_bn_js_default())(index);
        }
        if (index instanceof (external_bn_js_default())) {
          return index;
        }
        if (typeof index === "string") {
          return new (external_bn_js_default())(index, "hex");
        }
        return index;
      });
      var shares = {};
      for (var _x = 0; _x < newShareIndexes.length; _x += 1) {
        shares[newShareIndexes[_x].toString("hex")] = new base_Share(newShareIndexes[_x], this.polyEval(newShareIndexes[_x]));
      }
      return shares;
    }
  }, {
    key: "getPublicPolynomial",
    value: function getPublicPolynomial() {
      var polynomialCommitments = [];
      for (var i = 0; i < this.polynomial.length; i += 1) {
        polynomialCommitments.push(getPubKeyPoint(this.polynomial[i]));
      }
      this.publicPolynomial = new base_PublicPolynomial(polynomialCommitments);
      return this.publicPolynomial;
    }
  }, {
    key: "getPolynomialID",
    value: function getPolynomialID() {
      return this.publicPolynomial.polynomialId;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        polynomial: this.polynomial.map(function (x) {
          return x.toString("hex");
        })
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var polynomial = value.polynomial;
      return new Polynomial(polynomial.map(function (x) {
        return new (external_bn_js_default())(x, "hex");
      }));
    }
  }]);
  return Polynomial;
}();
/* harmony default export */ const base_Polynomial = (Polynomial);
;// CONCATENATED MODULE: ./src/base/ShareStore.ts




var ShareStore = /*#__PURE__*/function () {
  function ShareStore(share, polynomialID) {
    classCallCheck_default()(this, ShareStore);
    defineProperty_default()(this, "share", void 0);
    defineProperty_default()(this, "polynomialID", void 0);
    this.share = share;
    this.polynomialID = polynomialID;
  }
  createClass_default()(ShareStore, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        share: this.share,
        polynomialID: this.polynomialID.toString()
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var share = value.share,
        polynomialID = value.polynomialID;
      return new ShareStore(base_Share.fromJSON(share), polynomialID);
    }
  }]);
  return ShareStore;
}();
/* harmony default export */ const base_ShareStore = (ShareStore);
;// CONCATENATED MODULE: ./src/base/index.ts













;// CONCATENATED MODULE: external "@toruslabs/rss-client"
const rss_client_namespaceObject = require("@toruslabs/rss-client");
;// CONCATENATED MODULE: ./src/baseTypes/commonTypes.ts

;// CONCATENATED MODULE: ./src/index.ts




module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=commonTypes.cjs.js.map