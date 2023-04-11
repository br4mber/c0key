import { encrypt as encrypt$1, decrypt as decrypt$1, generatePrivate, getPublic } from '@toruslabs/eccrypto';
import BN from 'bn.js';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { ec } from 'elliptic';
import { serializeError } from 'serialize-error';
import { keccak256, toChecksumAddress } from 'web3-utils';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import { CustomError } from 'ts-custom-error';
export { RSSClient, ecPoint, hexPoint, randomSelection } from '@toruslabs/rss-client';

// const privKeyBnToEcc = (bnPrivKey) => {
//   return bnPrivKey.toBuffer("be", 32);
// };
// const privKeyBnToPubKeyECC = (bnPrivKey) => {
//   return getPublic(privKeyBnToEcc(bnPrivKey));
// };
var ecCurve = new ec("secp256k1");
// Wrappers around ECC encrypt/decrypt to use the hex serialization
// TODO: refactor to take BN
function encrypt(_x, _x2) {
  return _encrypt.apply(this, arguments);
}
function _encrypt() {
  _encrypt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(publicKey, msg) {
    var encryptedDetails;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return encrypt$1(publicKey, msg);
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
  _decrypt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(privKey, msg) {
    var bufferEncDetails;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bufferEncDetails = {
              ciphertext: Buffer.from(msg.ciphertext, "hex"),
              ephemPublicKey: Buffer.from(msg.ephemPublicKey, "hex"),
              iv: Buffer.from(msg.iv, "hex"),
              mac: Buffer.from(msg.mac, "hex")
            };
            return _context2.abrupt("return", decrypt$1(privKey, bufferEncDetails));
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
  return JSON.stringify(serializeError(error));
}
function generateAddressFromPublicKey(publicKey) {
  var ethAddressLower = "0x".concat(keccak256(publicKey.toString("hex")).slice(64 - 38));
  return toChecksumAddress(ethAddressLower);
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
  var key = new BN(generatePrivate());
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

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);
    _defineProperty(this, "x", void 0);
    _defineProperty(this, "y", void 0);
    this.x = new BN(x, "hex");
    this.y = new BN(y, "hex");
  }
  _createClass(Point, [{
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

// These functions are here because BN can't be extended
var toPrivKeyEC = function toPrivKeyEC(bn) {
  return ecCurve.keyFromPrivate(bn.toString("hex", 64));
};
var toPrivKeyECC = function toPrivKeyECC(bn) {
  var tmp = new BN(bn, "hex");
  return Buffer.from(tmp.toString("hex", 64), "hex");
};
var getPubKeyEC = function getPubKeyEC(bn) {
  return ecCurve.keyFromPrivate(bn.toString("hex", 64)).getPublic();
};
var getPubKeyECC = function getPubKeyECC(bn) {
  return getPublic(toPrivKeyECC(bn));
};
var getPubKeyPoint = function getPubKeyPoint(bn) {
  var pubKeyEc = getPubKeyEC(bn);
  return new Point(pubKeyEc.getX().toString("hex"), pubKeyEc.getY().toString("hex"));
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TkeyError = /*#__PURE__*/function (_CustomError) {
  _inherits(TkeyError, _CustomError);
  var _super = _createSuper(TkeyError);
  function TkeyError(code, message) {
    var _this;
    _classCallCheck(this, TkeyError);
    // takes care of stack and proto
    _this = _super.call(this, message);
    _defineProperty(_assertThisInitialized(_this), "code", void 0);
    _defineProperty(_assertThisInitialized(_this), "message", void 0);
    _this.code = code;
    _this.message = message || "";
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(_assertThisInitialized(_this), "name", {
      value: "TkeyError"
    });
    return _this;
  }
  _createClass(TkeyError, [{
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
}(CustomError);

var ONE_KEY_DELETE_NONCE = "__ONE_KEY_DELETE_NONCE__";
var ONE_KEY_NAMESPACE = "noncev2";

var PublicPolynomial = /*#__PURE__*/function () {
  function PublicPolynomial(polynomialCommitments) {
    _classCallCheck(this, PublicPolynomial);
    _defineProperty(this, "polynomialCommitments", void 0);
    _defineProperty(this, "polynomialId", void 0);
    this.polynomialCommitments = polynomialCommitments;
  }
  _createClass(PublicPolynomial, [{
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
        return Point.fromJSON(x);
      });
      return new PublicPolynomial(points);
    }
  }]);
  return PublicPolynomial;
}();

var PublicShare = /*#__PURE__*/function () {
  function PublicShare(shareIndex, shareCommitment) {
    _classCallCheck(this, PublicShare);
    _defineProperty(this, "shareCommitment", void 0);
    _defineProperty(this, "shareIndex", void 0);
    this.shareCommitment = new Point(shareCommitment.x, shareCommitment.y);
    this.shareIndex = new BN(shareIndex, "hex");
  }
  _createClass(PublicShare, [{
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
      return new PublicShare(shareIndex, Point.fromJSON(shareCommitment));
    }
  }]);
  return PublicShare;
}();

var Share = /*#__PURE__*/function () {
  function Share(shareIndex, share) {
    _classCallCheck(this, Share);
    _defineProperty(this, "share", void 0);
    _defineProperty(this, "shareIndex", void 0);
    this.share = new BN(share, "hex");
    this.shareIndex = new BN(shareIndex, "hex");
  }
  _createClass(Share, [{
    key: "getPublicShare",
    value: function getPublicShare() {
      return new PublicShare(this.shareIndex, getPubKeyPoint(this.share));
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

var Polynomial = /*#__PURE__*/function () {
  function Polynomial(polynomial) {
    _classCallCheck(this, Polynomial);
    _defineProperty(this, "polynomial", void 0);
    _defineProperty(this, "publicPolynomial", void 0);
    this.polynomial = polynomial;
  }
  _createClass(Polynomial, [{
    key: "getThreshold",
    value: function getThreshold() {
      return this.polynomial.length;
    }
  }, {
    key: "polyEval",
    value: function polyEval(x) {
      var tmpX = new BN(x, "hex");
      var xi = new BN(tmpX);
      var sum = new BN(0);
      sum = sum.add(this.polynomial[0]);
      for (var i = 1; i < this.polynomial.length; i += 1) {
        var tmp = xi.mul(this.polynomial[i]);
        sum = sum.add(tmp);
        sum = sum.umod(ecCurve.curve.n);
        xi = xi.mul(new BN(tmpX));
        xi = xi.umod(ecCurve.curve.n);
      }
      return sum;
    }
  }, {
    key: "generateShares",
    value: function generateShares(shareIndexes) {
      var newShareIndexes = shareIndexes.map(function (index) {
        if (typeof index === "number") {
          return new BN(index);
        }
        if (index instanceof BN) {
          return index;
        }
        if (typeof index === "string") {
          return new BN(index, "hex");
        }
        return index;
      });
      var shares = {};
      for (var x = 0; x < newShareIndexes.length; x += 1) {
        shares[newShareIndexes[x].toString("hex")] = new Share(newShareIndexes[x], this.polyEval(newShareIndexes[x]));
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
      this.publicPolynomial = new PublicPolynomial(polynomialCommitments);
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
        return new BN(x, "hex");
      }));
    }
  }]);
  return Polynomial;
}();

var ShareStore = /*#__PURE__*/function () {
  function ShareStore(share, polynomialID) {
    _classCallCheck(this, ShareStore);
    _defineProperty(this, "share", void 0);
    _defineProperty(this, "polynomialID", void 0);
    this.share = share;
    this.polynomialID = polynomialID;
  }
  _createClass(ShareStore, [{
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
      return new ShareStore(Share.fromJSON(share), polynomialID);
    }
  }]);
  return ShareStore;
}();

export { KEY_NOT_FOUND, ONE_KEY_DELETE_NONCE, ONE_KEY_NAMESPACE, Point, Polynomial, PublicPolynomial, PublicShare, SHARE_DELETED, Share, ShareStore, TkeyError, decrypt, derivePubKeyXFromPolyID, ecCurve, encrypt, generateAddressFromPublicKey, generateID, generatePrivateExcludingIndexes, getPubKeyEC, getPubKeyECC, getPubKeyPoint, isEmptyObject, isErrorObj, normalize, prettyPrintError, stripHexPrefix, toPrivKeyEC, toPrivKeyECC };
//# sourceMappingURL=commonTypes.esm.js.map
