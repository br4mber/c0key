import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { TkeyError, ecCurve, generatePrivateExcludingIndexes, Polynomial, Point, ShareStore, decrypt, toPrivKeyECC, getPubKeyPoint, PublicShare, Share, PublicPolynomial, toPrivKeyEC, stripHexPrefix, KEY_NOT_FOUND, prettyPrintError, SHARE_DELETED, randomSelection, ecPoint, hexPoint, RSSClient, encrypt, getPubKeyECC, ONE_KEY_DELETE_NONCE } from '@tkey/common-types';
import stringify from 'json-stable-stringify';
import { keccak256 } from 'web3-utils';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import BN from 'bn.js';
import { generatePrivate } from '@toruslabs/eccrypto';
import _typeof from '@babel/runtime/helpers/typeof';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
 * CoreError, extension for Error using CustomError
 * details: github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
 *
 * Usage:
 * 1. throw CoreError.metadataUndefined() // regularly used errors
 * 2. throw CoreError.fromCode(1304); // throw via code
 * 3. throw new CoreError(1000, "share indexes should be unique"); // for scarce errors
 *
 * Guide:
 * 1000 - core
 * 2000 - security questions
 * 3000 - webstorage
 * 4000 - common types (code reserved for future implementation)
 * 5000 - private key
 * 6000 - seed phrase
 * 7000 - share serialization
 * 8000 - share transfer
 */
var CoreError = /*#__PURE__*/function (_TkeyError) {
  _inherits(CoreError, _TkeyError);
  var _super = _createSuper(CoreError);
  function CoreError(code, message) {
    var _this;
    _classCallCheck(this, CoreError);
    // takes care of stack and proto
    _this = _super.call(this, code, message);
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(_assertThisInitialized(_this), "name", {
      value: "CoreError"
    });
    return _this;
  }
  _createClass(CoreError, null, [{
    key: "fromCode",
    value: function fromCode(code) {
      var extraMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return new CoreError(code, "".concat(CoreError.messages[code], " ").concat(extraMessage));
    }
  }, {
    key: "default",
    value: function _default() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return new CoreError(1000, "".concat(CoreError.messages[1000], " ").concat(extraMessage));
    }
    // Custom methods
    // Metadata
  }, {
    key: "metadataUndefined",
    value: function metadataUndefined() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1101, extraMessage);
    }
  }, {
    key: "delete1OutOf1OnlyManualSync",
    value: function delete1OutOf1OnlyManualSync() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1601, extraMessage);
    }
  }, {
    key: "metadataGetFailed",
    value: function metadataGetFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1102, extraMessage);
    }
  }, {
    key: "metadataPostFailed",
    value: function metadataPostFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1103, extraMessage);
    }
    // TkeyData
  }, {
    key: "tkeyStoreInvalid",
    value: function tkeyStoreInvalid() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1201, extraMessage);
    }
  }, {
    key: "tkeyEncryptionFailed",
    value: function tkeyEncryptionFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1202, extraMessage);
    }
  }, {
    key: "tkeyDecryptionFailed",
    value: function tkeyDecryptionFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1203, extraMessage);
    }
    // Shares
  }, {
    key: "privateKeyUnavailable",
    value: function privateKeyUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1301, extraMessage);
    }
  }, {
    key: "unableToReconstruct",
    value: function unableToReconstruct() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1302, extraMessage);
    }
  }, {
    key: "incorrectReconstruction",
    value: function incorrectReconstruction() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1303, extraMessage);
    }
  }, {
    key: "encryptedShareStoreUnavailable",
    value: function encryptedShareStoreUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1306, extraMessage);
    }
    // Metadata locks
  }, {
    key: "acquireLockFailed",
    value: function acquireLockFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1401, extraMessage);
    }
  }, {
    key: "releaseLockFailed",
    value: function releaseLockFailed() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1402, extraMessage);
    }
    // Authmetadata
  }, {
    key: "privKeyUnavailable",
    value: function privKeyUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1501, extraMessage);
    }
  }, {
    key: "metadataPubKeyUnavailable",
    value: function metadataPubKeyUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1502, extraMessage);
    }
  }, {
    key: "authMetadataGetUnavailable",
    value: function authMetadataGetUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1503, extraMessage);
    }
  }, {
    key: "authMetadataSetUnavailable",
    value: function authMetadataSetUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return CoreError.fromCode(1504, extraMessage);
    }
  }]);
  return CoreError;
}(TkeyError);
_defineProperty(CoreError, "messages", {
  1000: "Custom",
  // Misc
  1001: "Unable to delete service provider share",
  1002: "Wrong share index",
  1003: "Unable to updateSDK",
  // metadata
  1101: "metadata not found, SDK likely not initialized",
  1102: "getMetadata errored",
  1103: "setMetadata errored",
  1104: "previouslyFetchedCloudMetadata provided in initialization is outdated",
  1105: "previouslyFetchedCloudMetadata.nonce should never be higher than the latestShareDetails, please contact support",
  // tkeystore
  1201: "Invalid tkeyStore",
  1202: "Encryption failed",
  1203: "Decryption failed",
  // shares
  1301: "Private key not available. Please reconstruct key first",
  1302: "Unable to reconstruct",
  1303: "reconstructed key is not pub key",
  1304: "Share found in unexpected polynomial",
  1305: "Input is not supported",
  1306: "no encrypted share store for share exists",
  1307: "Share doesn't exist",
  1308: "Share was deleted",
  // lock
  1401: "Unable to acquire lock",
  1402: "Unable to release lock",
  // auth metadata
  1501: "privkey unavailable",
  1502: "metadata pubkey unavailable",
  1503: "getAuthMetadata errored",
  1504: "setAuthMetadata errored",
  1601: "delete1OutOf1 requires manualSync=true"
});

var generateEmptyBNArray = function generateEmptyBNArray(length) {
  return Array.from({
    length: length
  }, function () {
    return new BN(0);
  });
};
var denominator = function denominator(i, innerPoints) {
  var result = new BN(1);
  var xi = innerPoints[i].x;
  for (var j = innerPoints.length - 1; j >= 0; j -= 1) {
    if (i !== j) {
      var tmp = new BN(xi);
      tmp = tmp.sub(innerPoints[j].x);
      tmp = tmp.umod(ecCurve.curve.n);
      result = result.mul(tmp);
      result = result.umod(ecCurve.curve.n);
    }
  }
  return result;
};
var interpolationPoly = function interpolationPoly(i, innerPoints) {
  var coefficients = generateEmptyBNArray(innerPoints.length);
  var d = denominator(i, innerPoints);
  if (d.cmp(new BN(0)) === 0) {
    throw CoreError.default("Denominator for interpolationPoly is 0");
  }
  coefficients[0] = d.invm(ecCurve.curve.n);
  for (var k = 0; k < innerPoints.length; k += 1) {
    var newCoefficients = generateEmptyBNArray(innerPoints.length);
    if (k !== i) {
      var j = void 0;
      if (k < i) {
        j = k + 1;
      } else {
        j = k;
      }
      j -= 1;
      for (; j >= 0; j -= 1) {
        newCoefficients[j + 1] = newCoefficients[j + 1].add(coefficients[j]);
        newCoefficients[j + 1] = newCoefficients[j + 1].umod(ecCurve.curve.n);
        var tmp = new BN(innerPoints[k].x);
        tmp = tmp.mul(coefficients[j]);
        tmp = tmp.umod(ecCurve.curve.n);
        newCoefficients[j] = newCoefficients[j].sub(tmp);
        newCoefficients[j] = newCoefficients[j].umod(ecCurve.curve.n);
      }
      coefficients = newCoefficients;
    }
  }
  return coefficients;
};
var pointSort = function pointSort(innerPoints) {
  var pointArrClone = _toConsumableArray(innerPoints);
  pointArrClone.sort(function (a, b) {
    return a.x.cmp(b.x);
  });
  return pointArrClone;
};
var lagrange = function lagrange(unsortedPoints) {
  var sortedPoints = pointSort(unsortedPoints);
  var polynomial = generateEmptyBNArray(sortedPoints.length);
  for (var i = 0; i < sortedPoints.length; i += 1) {
    var coefficients = interpolationPoly(i, sortedPoints);
    for (var k = 0; k < sortedPoints.length; k += 1) {
      var tmp = new BN(sortedPoints[i].y);
      tmp = tmp.mul(coefficients[k]);
      polynomial[k] = polynomial[k].add(tmp);
      polynomial[k] = polynomial[k].umod(ecCurve.curve.n);
    }
  }
  return new Polynomial(polynomial);
};
function lagrangeInterpolatePolynomial(points) {
  return lagrange(points);
}
function lagrangeInterpolation(shares, nodeIndex) {
  if (shares.length !== nodeIndex.length) {
    throw CoreError.default("shares not equal to nodeIndex length in lagrangeInterpolation");
  }
  var secret = new BN(0);
  for (var i = 0; i < shares.length; i += 1) {
    var upper = new BN(1);
    var lower = new BN(1);
    for (var j = 0; j < shares.length; j += 1) {
      if (i !== j) {
        upper = upper.mul(nodeIndex[j].neg());
        upper = upper.umod(ecCurve.curve.n);
        var temp = nodeIndex[i].sub(nodeIndex[j]);
        temp = temp.umod(ecCurve.curve.n);
        lower = lower.mul(temp).umod(ecCurve.curve.n);
      }
    }
    var delta = upper.mul(lower.invm(ecCurve.curve.n)).umod(ecCurve.curve.n);
    delta = delta.mul(shares[i]).umod(ecCurve.curve.n);
    secret = secret.add(delta);
  }
  return secret.umod(ecCurve.curve.n);
}
// generateRandomPolynomial - determinisiticShares are assumed random
function generateRandomPolynomial(degree, secret, deterministicShares) {
  var actualS = secret;
  if (!secret) {
    actualS = generatePrivateExcludingIndexes([new BN(0)]);
  }
  if (!deterministicShares) {
    var poly = [actualS];
    for (var i = 0; i < degree; i += 1) {
      var share = generatePrivateExcludingIndexes(poly);
      poly.push(share);
    }
    return new Polynomial(poly);
  }
  if (!Array.isArray(deterministicShares)) {
    throw CoreError.default("deterministic shares in generateRandomPolynomial should be an array");
  }
  if (deterministicShares.length > degree) {
    throw CoreError.default("deterministicShares in generateRandomPolynomial should be less or equal than degree to ensure an element of randomness");
  }
  var points = {};
  deterministicShares.forEach(function (share) {
    points[share.shareIndex.toString("hex")] = new Point(share.shareIndex, share.share);
  });
  for (var _i = 0; _i < degree - deterministicShares.length; _i += 1) {
    var shareIndex = generatePrivateExcludingIndexes([new BN(0)]);
    while (points[shareIndex.toString("hex")] !== undefined) {
      shareIndex = generatePrivateExcludingIndexes([new BN(0)]);
    }
    points[shareIndex.toString("hex")] = new Point(shareIndex, new BN(generatePrivate()));
  }
  points["0"] = new Point(new BN(0), actualS);
  return lagrangeInterpolatePolynomial(Object.values(points));
}
//  2 + 3x = y | secret for index 1 is 5 >>> g^5 is the commitment | now we have g^2, g^3 and 1, |
function polyCommitmentEval(polyCommitments, index) {
  // convert to base points, this is badly written, its the only way to access the point rn zzz TODO: refactor
  var basePtPolyCommitments = [];
  for (var i = 0; i < polyCommitments.length; i += 1) {
    var key = ecCurve.keyFromPublic({
      x: polyCommitments[i].x.toString("hex"),
      y: polyCommitments[i].y.toString("hex")
    }, "");
    basePtPolyCommitments.push(key.getPublic());
  }
  var shareCommitment = basePtPolyCommitments[0];
  for (var _i2 = 1; _i2 < basePtPolyCommitments.length; _i2 += 1) {
    var factor = index.pow(new BN(_i2)).umod(ecCurve.n);
    var e = basePtPolyCommitments[_i2].mul(factor);
    shareCommitment = shareCommitment.add(e);
  }
  return new Point(shareCommitment.getX(), shareCommitment.getY());
}
function dotProduct(arr1, arr2) {
  var modulus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new BN(0);
  if (arr1.length !== arr2.length) {
    throw new Error("arrays of different lengths");
  }
  var sum = new BN(0);
  for (var i = 0; i < arr1.length; i++) {
    sum = sum.add(arr1[i].mul(arr2[i]));
    if (modulus.cmp(new BN(0)) !== 0) {
      sum = sum.umod(modulus);
    }
  }
  return sum;
}
var kCombinations = function kCombinations(s, k) {
  var set = s;
  if (typeof set === "number") {
    set = Array.from({
      length: set
    }, function (_, i) {
      return i;
    });
  }
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k === set.length) {
    return [set];
  }
  if (k === 1) {
    return set.reduce(function (acc, cur) {
      return [].concat(_toConsumableArray(acc), [[cur]]);
    }, []);
  }
  var combs = [];
  var tailCombs = [];
  for (var i = 0; i <= set.length - k + 1; i += 1) {
    tailCombs = kCombinations(set.slice(i + 1), k - 1);
    for (var j = 0; j < tailCombs.length; j += 1) {
      combs.push([set[i]].concat(_toConsumableArray(tailCombs[j])));
    }
  }
  return combs;
};
function getLagrangeCoeffs(_allIndexes, _myIndex) {
  var _target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var allIndexes = _allIndexes.map(function (i) {
    return new BN(i);
  });
  var myIndex = new BN(_myIndex);
  var target = new BN(_target);
  var upper = new BN(1);
  var lower = new BN(1);
  for (var j = 0; j < allIndexes.length; j += 1) {
    if (myIndex.cmp(allIndexes[j]) !== 0) {
      var tempUpper = target.sub(allIndexes[j]);
      tempUpper = tempUpper.umod(ecCurve.curve.n);
      upper = upper.mul(tempUpper);
      upper = upper.umod(ecCurve.curve.n);
      var tempLower = myIndex.sub(allIndexes[j]);
      tempLower = tempLower.umod(ecCurve.curve.n);
      lower = lower.mul(tempLower).umod(ecCurve.curve.n);
    }
  }
  return upper.mul(lower.invm(ecCurve.curve.n)).umod(ecCurve.curve.n);
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Metadata = /*#__PURE__*/function () {
  // Tuple of PolyID and array of ShareIndexes

  function Metadata(input) {
    _classCallCheck(this, Metadata);
    _defineProperty(this, "pubKey", void 0);
    _defineProperty(this, "publicPolynomials", void 0);
    _defineProperty(this, "publicShares", void 0);
    _defineProperty(this, "polyIDList", void 0);
    _defineProperty(this, "generalStore", void 0);
    _defineProperty(this, "tkeyStore", void 0);
    _defineProperty(this, "scopedStore", void 0);
    _defineProperty(this, "nonce", void 0);
    _defineProperty(this, "tssNonces", void 0);
    _defineProperty(this, "tssPolyCommits", void 0);
    _defineProperty(this, "factorPubs", void 0);
    _defineProperty(this, "factorEncs", void 0);
    this.tssPolyCommits = {};
    this.tssNonces = {};
    this.factorPubs = {};
    this.factorEncs = {};
    this.publicPolynomials = {};
    this.publicShares = {};
    this.generalStore = {};
    this.tkeyStore = {};
    this.scopedStore = {};
    this.pubKey = input;
    this.polyIDList = [];
    this.nonce = 0;
  }
  _createClass(Metadata, [{
    key: "getShareIndexesForPolynomial",
    value: function getShareIndexesForPolynomial(polyID) {
      var matchingPolyIDs = this.polyIDList.filter(function (tuple) {
        return tuple[0] === polyID;
      });
      if (matchingPolyIDs.length < 1) {
        throw CoreError.default("there is no matching polyID");
      } else if (matchingPolyIDs.length > 1) {
        throw CoreError.default("there is more than one matching polyID");
      }
      return matchingPolyIDs[0][1];
    }
  }, {
    key: "getLatestPublicPolynomial",
    value: function getLatestPublicPolynomial() {
      return this.publicPolynomials[this.polyIDList[this.polyIDList.length - 1][0]];
    }
  }, {
    key: "addPublicShare",
    value: function addPublicShare(polynomialID, publicShare) {
      if (!(polynomialID in this.publicShares)) {
        this.publicShares[polynomialID] = {};
      }
      this.publicShares[polynomialID][publicShare.shareIndex.toString("hex")] = publicShare;
    }
    // getPublicShare(polynomialID: PolynomialID, shareIndex: BN): PublicShare {
    // }
  }, {
    key: "setGeneralStoreDomain",
    value: function setGeneralStoreDomain(key, obj) {
      this.generalStore[key] = obj;
    }
  }, {
    key: "getGeneralStoreDomain",
    value: function getGeneralStoreDomain(key) {
      return this.generalStore[key];
    }
  }, {
    key: "deleteGeneralStoreDomain",
    value: function deleteGeneralStoreDomain(key) {
      delete this.generalStore[key];
    }
  }, {
    key: "setTkeyStoreDomain",
    value: function setTkeyStoreDomain(key, arr) {
      this.tkeyStore[key] = arr;
    }
  }, {
    key: "getTkeyStoreDomain",
    value: function getTkeyStoreDomain(key) {
      return this.tkeyStore[key];
    }
  }, {
    key: "addTSSData",
    value: function addTSSData(tssData) {
      var tssTag = tssData.tssTag,
        tssNonce = tssData.tssNonce,
        tssPolyCommits = tssData.tssPolyCommits,
        factorPubs = tssData.factorPubs,
        factorEncs = tssData.factorEncs;
      if (tssNonce !== undefined) this.tssNonces[tssTag] = tssNonce;
      if (tssPolyCommits) this.tssPolyCommits[tssTag] = tssPolyCommits;
      if (factorPubs) this.factorPubs[tssTag] = factorPubs;
      if (factorEncs) this.factorEncs[tssTag] = factorEncs;
    }
    // appends shares and public polynomial to metadata.
    // should represent a generation of share or edit of threshold
  }, {
    key: "addFromPolynomialAndShares",
    value: function addFromPolynomialAndShares(polynomial, shares) {
      var publicPolynomial = polynomial.getPublicPolynomial();
      var polyID = publicPolynomial.getPolynomialID();
      this.publicPolynomials[polyID] = publicPolynomial;
      var shareIndexArr = [];
      if (Array.isArray(shares)) {
        for (var i = 0; i < shares.length; i += 1) {
          this.addPublicShare(publicPolynomial.getPolynomialID(), shares[i].getPublicShare());
          shareIndexArr.push(shares[i].shareIndex.toString("hex"));
        }
      } else {
        for (var k in shares) {
          if (Object.prototype.hasOwnProperty.call(shares, k)) {
            this.addPublicShare(publicPolynomial.getPolynomialID(), shares[k].getPublicShare());
            shareIndexArr.push(shares[k].shareIndex.toString("hex"));
          }
        }
      }
      this.polyIDList.push([polyID, shareIndexArr]);
    }
  }, {
    key: "setScopedStore",
    value: function setScopedStore(domain, data) {
      this.scopedStore[domain] = data;
    }
  }, {
    key: "getEncryptedShare",
    value: function () {
      var _getEncryptedShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(shareStore) {
        var pubShare, encryptedShareStore, encryptedShare, rawDecrypted;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pubShare = shareStore.share.getPublicShare();
                encryptedShareStore = this.scopedStore.encryptedShares;
                if (encryptedShareStore) {
                  _context.next = 4;
                  break;
                }
                throw CoreError.encryptedShareStoreUnavailable("".concat(shareStore));
              case 4:
                encryptedShare = encryptedShareStore[pubShare.shareCommitment.x.toString("hex")];
                if (encryptedShare) {
                  _context.next = 7;
                  break;
                }
                throw CoreError.encryptedShareStoreUnavailable("".concat(shareStore));
              case 7:
                _context.next = 9;
                return decrypt(toPrivKeyECC(shareStore.share.share), encryptedShare);
              case 9:
                rawDecrypted = _context.sent;
                return _context.abrupt("return", ShareStore.fromJSON(JSON.parse(rawDecrypted.toString())));
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getEncryptedShare(_x) {
        return _getEncryptedShare.apply(this, arguments);
      }
      return getEncryptedShare;
    }()
  }, {
    key: "getShareDescription",
    value: function getShareDescription() {
      return this.getGeneralStoreDomain("shareDescriptions");
    }
  }, {
    key: "addShareDescription",
    value: function addShareDescription(shareIndex, description) {
      var currentSD = this.getGeneralStoreDomain("shareDescriptions") || {};
      if (currentSD[shareIndex]) {
        currentSD[shareIndex].push(description);
      } else {
        currentSD[shareIndex] = [description];
      }
      this.setGeneralStoreDomain("shareDescriptions", currentSD);
    }
  }, {
    key: "deleteShareDescription",
    value: function deleteShareDescription(shareIndex, description) {
      var currentSD = this.getGeneralStoreDomain("shareDescriptions");
      var index = currentSD[shareIndex].indexOf(description);
      if (index > -1) {
        currentSD[shareIndex].splice(index, 1);
      } else {
        throw CoreError.default("No share description found for the given shareIndex: ".concat(shareIndex, " \n        and description: ").concat(description));
      }
    }
  }, {
    key: "updateShareDescription",
    value: function updateShareDescription(shareIndex, oldDescription, newDescription) {
      var currentSD = this.getGeneralStoreDomain("shareDescriptions");
      var index = currentSD[shareIndex].indexOf(oldDescription);
      if (index > -1) {
        currentSD[shareIndex][index] = newDescription;
      } else {
        throw CoreError.default("No share description found for the given shareIndex:\n        ".concat(shareIndex, " and description: ").concat(oldDescription));
      }
    }
  }, {
    key: "shareToShareStore",
    value: function shareToShareStore(share) {
      var pubkey = getPubKeyPoint(share);
      for (var i = this.polyIDList.length - 1; i >= 0; i -= 1) {
        var el = this.polyIDList[i][0];
        for (var t = 0; t < this.polyIDList[i][1].length; t += 1) {
          var shareIndex = this.polyIDList[i][1][t];
          // find pubshare in cache if its there
          var pubShare = void 0;
          if (this.publicShares[el]) {
            if (this.publicShares[el][shareIndex]) {
              pubShare = this.publicShares[el][shareIndex];
            }
          }
          // if not reconstruct
          if (!pubShare) {
            pubShare = new PublicShare(shareIndex, polyCommitmentEval(this.publicPolynomials[el].polynomialCommitments, new BN(shareIndex, "hex")));
          }
          if (pubShare.shareCommitment.x.eq(pubkey.x) && pubShare.shareCommitment.y.eq(pubkey.y)) {
            var tempShare = new Share(pubShare.shareIndex, share);
            return new ShareStore(tempShare, el);
          }
        }
      }
      {
        throw CoreError.fromCode(1307);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return Metadata.fromJSON(JSON.parse(stringify(this)));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      // squash data to serialized polyID according to spec
      var serializedPolyIDList = [];
      for (var i = 0; i < this.polyIDList.length; i += 1) {
        var _polyID$split$concat;
        var polyID = this.polyIDList[i][0];
        var shareIndexes = this.polyIDList[i][1];
        var sortedShareIndexes = shareIndexes.sort(function (a, b) {
          return new BN(a, "hex").cmp(new BN(b, "hex"));
        });
        var serializedPolyID = (_polyID$split$concat = polyID.split("|").concat("0x0")).concat.apply(_polyID$split$concat, _toConsumableArray(sortedShareIndexes)).join("|");
        serializedPolyIDList.push(serializedPolyID);
      }
      return _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
        pubKey: this.pubKey.encode("elliptic-compressed", {
          ec: ecCurve
        }).toString(),
        polyIDList: serializedPolyIDList,
        scopedStore: this.scopedStore,
        generalStore: this.generalStore,
        tkeyStore: this.tkeyStore,
        nonce: this.nonce
      }, this.tssNonces && {
        tssNonces: this.tssNonces
      }), this.tssPolyCommits && {
        tssPolyCommits: this.tssPolyCommits
      }), this.factorPubs && {
        factorPubs: this.factorPubs
      }), this.factorEncs && {
        factorEncs: this.factorEncs
      });
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var pubKey = value.pubKey,
        polyIDList = value.polyIDList,
        generalStore = value.generalStore,
        tkeyStore = value.tkeyStore,
        scopedStore = value.scopedStore,
        nonce = value.nonce,
        tssNonces = value.tssNonces,
        tssPolyCommits = value.tssPolyCommits,
        factorPubs = value.factorPubs,
        factorEncs = value.factorEncs;
      var point = Point.fromCompressedPub(pubKey);
      var metadata = new Metadata(point);
      var unserializedPolyIDList = [];
      if (generalStore) metadata.generalStore = generalStore;
      if (tkeyStore) metadata.tkeyStore = tkeyStore;
      if (scopedStore) metadata.scopedStore = scopedStore;
      if (nonce) metadata.nonce = nonce;
      if (tssPolyCommits) {
        metadata.tssPolyCommits = {};
        for (var key in tssPolyCommits) {
          metadata.tssPolyCommits[key] = tssPolyCommits[key].map(function (obj) {
            return new Point(obj.x, obj.y);
          });
        }
      }
      if (tssNonces) {
        metadata.tssNonces = {};
        for (var _key in tssNonces) {
          metadata.tssNonces[_key] = tssNonces[_key];
        }
      }
      if (factorPubs) {
        metadata.factorPubs = {};
        for (var _key2 in factorPubs) {
          metadata.factorPubs[_key2] = factorPubs[_key2].map(function (obj) {
            return new Point(obj.x, obj.y);
          });
        }
      }
      if (factorEncs) metadata.factorEncs = factorEncs;
      var _loop = function _loop(i) {
        var serializedPolyID = polyIDList[i];
        var arrPolyID = serializedPolyID.split("|");
        var zeroIndex = arrPolyID.findIndex(function (v) {
          return v === "0x0";
        });
        var firstHalf = arrPolyID.slice(0, zeroIndex);
        var secondHalf = arrPolyID.slice(zeroIndex + 1, arrPolyID.length);
        // for publicPolynomials
        var pubPolyID = firstHalf.join("|");
        var pointCommitments = [];
        firstHalf.forEach(function (compressedCommitment) {
          pointCommitments.push(Point.fromCompressedPub(compressedCommitment));
        });
        var publicPolynomial = new PublicPolynomial(pointCommitments);
        metadata.publicPolynomials[pubPolyID] = publicPolynomial;
        // for polyIDList
        unserializedPolyIDList.push([pubPolyID, secondHalf]);
      };
      for (var i = 0; i < polyIDList.length; i += 1) {
        _loop(i);
      }
      metadata.polyIDList = unserializedPolyIDList;
      return metadata;
    }
  }]);
  return Metadata;
}();

var AuthMetadata = /*#__PURE__*/function () {
  function AuthMetadata(metadata, privKey) {
    _classCallCheck(this, AuthMetadata);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "privKey", void 0);
    this.metadata = metadata;
    this.privKey = privKey;
  }
  _createClass(AuthMetadata, [{
    key: "toJSON",
    value: function toJSON() {
      var data = this.metadata;
      if (!this.privKey) throw CoreError.privKeyUnavailable();
      var k = toPrivKeyEC(this.privKey);
      var sig = k.sign(stripHexPrefix(keccak256(stringify(data))));
      return {
        data: data,
        sig: sig.toDER("hex")
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var data = value.data,
        sig = value.sig;
      var m = Metadata.fromJSON(data);
      if (!m.pubKey) throw CoreError.metadataPubKeyUnavailable();
      var pubK = ecCurve.keyFromPublic({
        x: m.pubKey.x.toString("hex", 64),
        y: m.pubKey.y.toString("hex", 64)
      }, "hex");
      if (!pubK.verify(stripHexPrefix(keccak256(stringify(data))), sig)) {
        throw CoreError.default("Signature not valid for returning metadata");
      }
      return new AuthMetadata(m);
    }
  }]);
  return AuthMetadata;
}();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// TODO: handle errors for get and set with retries
var ThresholdKey = /*#__PURE__*/function () {
  function ThresholdKey(args) {
    _classCallCheck(this, ThresholdKey);
    _defineProperty(this, "modules", void 0);
    _defineProperty(this, "enableLogging", void 0);
    _defineProperty(this, "serviceProvider", void 0);
    _defineProperty(this, "storageLayer", void 0);
    _defineProperty(this, "shares", void 0);
    _defineProperty(this, "privKey", void 0);
    _defineProperty(this, "lastFetchedCloudMetadata", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "manualSync", void 0);
    _defineProperty(this, "tssTag", void 0);
    _defineProperty(this, "_localMetadataTransitions", void 0);
    _defineProperty(this, "_refreshMiddleware", void 0);
    _defineProperty(this, "_reconstructKeyMiddleware", void 0);
    _defineProperty(this, "_shareSerializationMiddleware", void 0);
    _defineProperty(this, "storeDeviceShare", void 0);
    _defineProperty(this, "haveWriteMetadataLock", void 0);
    var _ref = args || {},
      _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? {} : _ref$modules,
      serviceProvider = _ref.serviceProvider,
      storageLayer = _ref.storageLayer,
      _ref$manualSync = _ref.manualSync,
      manualSync = _ref$manualSync === void 0 ? false : _ref$manualSync,
      tssTag = _ref.tssTag;
    this.enableLogging = enableLogging;
    this.serviceProvider = serviceProvider;
    this.storageLayer = storageLayer;
    this.modules = modules;
    this.shares = {};
    this.privKey = undefined;
    this.manualSync = manualSync;
    this._refreshMiddleware = {};
    this._reconstructKeyMiddleware = {};
    this._shareSerializationMiddleware = undefined;
    this.storeDeviceShare = undefined;
    this._localMetadataTransitions = [[], []];
    this.setModuleReferences(); // Providing ITKeyApi access to modules
    this.haveWriteMetadataLock = "";
    this.tssTag = tssTag || "default";
  }
  _createClass(ThresholdKey, [{
    key: "getStorageLayer",
    value: function getStorageLayer() {
      return this.storageLayer;
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      if (typeof this.metadata !== "undefined") {
        return this.metadata;
      }
      throw CoreError.metadataUndefined();
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
        var p, withShare, importKey, neverInitializeNewKey, transitionMetadata, previouslyFetchedCloudMetadata, previousLocalMetadataTransitions, useTSS, deviceTSSShare, factorPub, deviceTSSIndex, previousLocalMetadataTransitionsExists, reinitializing, reinitializingWithNewKeyAssign, shareStore, spIncludeLocalMetadataTransitions, spLocalMetadataTransitions, rawServiceProviderShare, noKeyFound, _yield$this$_initiali, factorEncs, factorPubs, tssPolyCommits, currentMetadata, latestCloudMetadata, latestShareDetails, noMetadataExistsForShare, latestShare;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // setup initial params/states
                p = params || {};
                if (!(p.delete1OutOf1 && !this.manualSync)) {
                  _context.next = 3;
                  break;
                }
                throw CoreError.delete1OutOf1OnlyManualSync();
              case 3:
                withShare = p.withShare, importKey = p.importKey, neverInitializeNewKey = p.neverInitializeNewKey, transitionMetadata = p.transitionMetadata, previouslyFetchedCloudMetadata = p.previouslyFetchedCloudMetadata, previousLocalMetadataTransitions = p.previousLocalMetadataTransitions, useTSS = p.useTSS, deviceTSSShare = p.deviceTSSShare, factorPub = p.factorPub, deviceTSSIndex = p.deviceTSSIndex;
                if (!(useTSS && !factorPub)) {
                  _context.next = 6;
                  break;
                }
                throw CoreError.default("cannot use TSS without providing factor key");
              case 6:
                previousLocalMetadataTransitionsExists = previousLocalMetadataTransitions && previousLocalMetadataTransitions[0].length > 0 && previousLocalMetadataTransitions[1].length > 0;
                reinitializing = transitionMetadata && previousLocalMetadataTransitionsExists; // are we reinitializing the SDK?
                // in the case we're reinitializing whilst newKeyAssign has not been synced
                reinitializingWithNewKeyAssign = reinitializing && previouslyFetchedCloudMetadata === undefined;
                if (!(withShare instanceof ShareStore)) {
                  _context.next = 13;
                  break;
                }
                shareStore = withShare;
                _context.next = 42;
                break;
              case 13:
                if (!(_typeof(withShare) === "object")) {
                  _context.next = 17;
                  break;
                }
                shareStore = ShareStore.fromJSON(withShare);
                _context.next = 42;
                break;
              case 17:
                if (withShare) {
                  _context.next = 41;
                  break;
                }
                // default to use service provider
                // first we see if a share has been kept for us
                spIncludeLocalMetadataTransitions = reinitializingWithNewKeyAssign;
                spLocalMetadataTransitions = reinitializingWithNewKeyAssign ? previousLocalMetadataTransitions : undefined;
                _context.next = 22;
                return this.getGenericMetadataWithTransitionStates({
                  serviceProvider: this.serviceProvider,
                  includeLocalMetadataTransitions: spIncludeLocalMetadataTransitions,
                  _localMetadataTransitions: spLocalMetadataTransitions,
                  fromJSONConstructor: {
                    fromJSON: function fromJSON(val) {
                      return val;
                    }
                  }
                });
              case 22:
                rawServiceProviderShare = _context.sent;
                noKeyFound = rawServiceProviderShare;
                if (!(noKeyFound.message === KEY_NOT_FOUND)) {
                  _context.next = 38;
                  break;
                }
                if (!neverInitializeNewKey) {
                  _context.next = 27;
                  break;
                }
                throw CoreError.default("key has not been generated yet");
              case 27:
                _context.next = 29;
                return this._initializeNewKey({
                  initializeModules: true,
                  importedKey: importKey,
                  delete1OutOf1: p.delete1OutOf1
                });
              case 29:
                if (!useTSS) {
                  _context.next = 37;
                  break;
                }
                _context.next = 32;
                return this._initializeNewTSSKey(this.tssTag, deviceTSSShare, factorPub, deviceTSSIndex);
              case 32:
                _yield$this$_initiali = _context.sent;
                factorEncs = _yield$this$_initiali.factorEncs;
                factorPubs = _yield$this$_initiali.factorPubs;
                tssPolyCommits = _yield$this$_initiali.tssPolyCommits;
                this.metadata.addTSSData({
                  tssTag: this.tssTag,
                  tssNonce: 0,
                  tssPolyCommits: tssPolyCommits,
                  factorPubs: factorPubs,
                  factorEncs: factorEncs
                });
              case 37:
                return _context.abrupt("return", this.getKeyDetails());
              case 38:
                // else we continue with catching up share and metadata
                shareStore = ShareStore.fromJSON(rawServiceProviderShare);
                _context.next = 42;
                break;
              case 41:
                throw CoreError.default("Input is not supported");
              case 42:
                _context.prev = 42;
                _context.next = 45;
                return this.catchupToLatestShare({
                  shareStore: shareStore
                });
              case 45:
                latestShareDetails = _context.sent;
                _context.next = 53;
                break;
              case 48:
                _context.prev = 48;
                _context.t0 = _context["catch"](42);
                // check if error is not the undefined error
                // if so we don't throw immediately incase there is valid transition metadata
                noMetadataExistsForShare = _context.t0.code === 1503;
                if (!(!noMetadataExistsForShare || !reinitializing)) {
                  _context.next = 53;
                  break;
                }
                throw _context.t0;
              case 53:
                if (!(reinitializing && !reinitializingWithNewKeyAssign)) {
                  _context.next = 63;
                  break;
                }
                if (!(previouslyFetchedCloudMetadata.nonce < latestShareDetails.shareMetadata.nonce)) {
                  _context.next = 58;
                  break;
                }
                throw CoreError.fromCode(1104);
              case 58:
                if (!(previouslyFetchedCloudMetadata.nonce > latestShareDetails.shareMetadata.nonce)) {
                  _context.next = 60;
                  break;
                }
                throw CoreError.fromCode(1105);
              case 60:
                latestCloudMetadata = previouslyFetchedCloudMetadata;
                _context.next = 64;
                break;
              case 63:
                latestCloudMetadata = latestShareDetails ? latestShareDetails.shareMetadata.clone() : undefined;
              case 64:
                // If we've been provided with transition metadata we use that as the current metadata instead
                // as we want to maintain state before and after serialization.
                // (Given that the checks for cloud metadata pass)
                if (reinitializing) {
                  currentMetadata = transitionMetadata;
                  this._localMetadataTransitions = previousLocalMetadataTransitions;
                } else {
                  currentMetadata = latestShareDetails.shareMetadata;
                }
                this.lastFetchedCloudMetadata = latestCloudMetadata;
                this.metadata = currentMetadata;
                latestShare = latestShareDetails ? latestShareDetails.latestShare : shareStore;
                this.inputShareStore(latestShare);
                // initialize modules
                _context.next = 71;
                return this.initializeModules();
              case 71:
                if (!useTSS) {
                  _context.next = 75;
                  break;
                }
                if (this.metadata.tssPolyCommits[this.tssTag]) {
                  _context.next = 75;
                  break;
                }
                _context.next = 75;
                return this._initializeNewTSSKey(this.tssTag, deviceTSSShare, factorPub);
              case 75:
                return _context.abrupt("return", this.getKeyDetails());
              case 76:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[42, 48]]);
      }));
      function initialize(_x) {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "getFactorEncs",
    value: function getFactorEncs(factorPub) {
      if (!this.metadata) throw CoreError.metadataUndefined();
      if (!this.metadata.factorEncs) throw CoreError.default("no factor encs mapping");
      if (!this.metadata.factorPubs) throw CoreError.default("no factor pubs mapping");
      var factorPubs = this.metadata.factorPubs[this.tssTag];
      if (!factorPubs) throw CoreError.default("no factor pubs for this tssTag ".concat(this.tssTag));
      if (factorPubs.filter(function (f) {
        return f.x.cmp(factorPub.x) === 0 && f.y.cmp(factorPub.y) === 0;
      }).length === 0) throw CoreError.default("factor pub ".concat(factorPub, " not found for tssTag ").concat(this.tssTag));
      if (!this.metadata.factorEncs[this.tssTag]) throw CoreError.default("no factor encs for tssTag ".concat(this.tssTag));
      var factorPubID = factorPub.x.toString(16, 64);
      return this.metadata.factorEncs[this.tssTag][factorPubID];
    }
    /**
     * getTSSShare accepts a factorKey and returns the TSS share based on the factor encrypted TSS shares in the metadata
     * @param factorKey - factor key
     */
  }, {
    key: "getTSSShare",
    value: function () {
      var _getTSSShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(factorKey, opts) {
        var factorPub, factorEncs, userEnc, serverEncs, tssIndex, type, userDecryption, serverDecryptions, tssShareBufs, tssShareBNs, tssCommits, userDec, tssSharePub, tssCommitA0, tssCommitA1, _tssSharePub, j, serverDecs, serverIndexes, _ref2, threshold, combis, _loop, i, _ret;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.privKey) {
                  _context2.next = 2;
                  break;
                }
                throw CoreError.default("tss share cannot be returned until you've reconstructed tkey");
              case 2:
                factorPub = getPubKeyPoint(factorKey);
                factorEncs = this.getFactorEncs(factorPub);
                userEnc = factorEncs.userEnc, serverEncs = factorEncs.serverEncs, tssIndex = factorEncs.tssIndex, type = factorEncs.type;
                _context2.next = 7;
                return decrypt(Buffer.from(factorKey.toString(16, 64), "hex"), userEnc);
              case 7:
                userDecryption = _context2.sent;
                _context2.next = 10;
                return Promise.all(serverEncs.map(function (factorEnc) {
                  if (factorEnc === null) return null;
                  return decrypt(Buffer.from(factorKey.toString(16, 64), "hex"), factorEnc);
                }));
              case 10:
                serverDecryptions = _context2.sent;
                tssShareBufs = [userDecryption].concat(serverDecryptions);
                tssShareBNs = tssShareBufs.map(function (buf) {
                  if (buf === null) return null;
                  return new BN(buf.toString("hex"), "hex");
                });
                tssCommits = this.getTSSCommits();
                userDec = tssShareBNs[0];
                if (!(type === "direct")) {
                  _context2.next = 24;
                  break;
                }
                tssSharePub = ecCurve.g.mul(userDec);
                tssCommitA0 = ecCurve.keyFromPublic({
                  x: tssCommits[0].x.toString(16, 64),
                  y: tssCommits[0].y.toString(16, 64)
                }).getPublic();
                tssCommitA1 = ecCurve.keyFromPublic({
                  x: tssCommits[1].x.toString(16, 64),
                  y: tssCommits[1].y.toString(16, 64)
                }).getPublic();
                _tssSharePub = tssCommitA0;
                for (j = 0; j < tssIndex; j++) {
                  _tssSharePub = _tssSharePub.add(tssCommitA1);
                }
                if (!(tssSharePub.getX().cmp(_tssSharePub.getX()) === 0 && tssSharePub.getY().cmp(_tssSharePub.getY()) === 0)) {
                  _context2.next = 23;
                  break;
                }
                return _context2.abrupt("return", {
                  tssIndex: tssIndex,
                  tssShare: userDec
                });
              case 23:
                throw new Error("user decryption does not match tss commitments...");
              case 24:
                // if type === "hierarchical"
                serverDecs = tssShareBNs.slice(1); // 5 elems
                serverIndexes = new Array(serverDecs.length).fill(null).map(function (_, i) {
                  return i + 1;
                });
                _ref2 = opts || {}, threshold = _ref2.threshold;
                combis = kCombinations(serverDecs.length, threshold || Math.ceil(serverDecs.length / 2));
                _loop = function _loop(i) {
                  var combi = combis[i];
                  var selectedServerDecs = serverDecs.filter(function (_, j) {
                    return combi.indexOf(j) > -1;
                  });
                  if (selectedServerDecs.includes(null)) return "continue";
                  var selectedServerIndexes = serverIndexes.filter(function (_, j) {
                    return combi.indexOf(j) > -1;
                  });
                  var serverLagrangeCoeffs = selectedServerIndexes.map(function (x) {
                    return getLagrangeCoeffs(selectedServerIndexes, x);
                  });
                  var serverInterpolated = dotProduct(serverLagrangeCoeffs, selectedServerDecs, ecCurve.n);
                  var lagrangeCoeffs = [getLagrangeCoeffs([1, 99], 1), getLagrangeCoeffs([1, 99], 99)];
                  var tssShare = dotProduct(lagrangeCoeffs, [serverInterpolated, userDec], ecCurve.n);
                  var tssSharePub = ecCurve.g.mul(tssShare);
                  var tssCommitA0 = ecCurve.keyFromPublic({
                    x: tssCommits[0].x.toString(16, 64),
                    y: tssCommits[0].y.toString(16, 64)
                  }).getPublic();
                  var tssCommitA1 = ecCurve.keyFromPublic({
                    x: tssCommits[1].x.toString(16, 64),
                    y: tssCommits[1].y.toString(16, 64)
                  }).getPublic();
                  var _tssSharePub = tssCommitA0;
                  for (var j = 0; j < tssIndex; j++) {
                    _tssSharePub = _tssSharePub.add(tssCommitA1);
                  }
                  if (tssSharePub.getX().cmp(_tssSharePub.getX()) === 0 && tssSharePub.getY().cmp(_tssSharePub.getY()) === 0) {
                    return {
                      v: {
                        tssIndex: tssIndex,
                        tssShare: tssShare
                      }
                    };
                  }
                };
                i = 0;
              case 30:
                if (!(i < combis.length)) {
                  _context2.next = 39;
                  break;
                }
                _ret = _loop(i);
                if (!(_ret === "continue")) {
                  _context2.next = 34;
                  break;
                }
                return _context2.abrupt("continue", 36);
              case 34:
                if (!(_typeof(_ret) === "object")) {
                  _context2.next = 36;
                  break;
                }
                return _context2.abrupt("return", _ret.v);
              case 36:
                i++;
                _context2.next = 30;
                break;
              case 39:
                throw new Error("could not find any combination of server decryptions that match tss commitments...");
              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getTSSShare(_x2, _x3) {
        return _getTSSShare.apply(this, arguments);
      }
      return getTSSShare;
    }()
  }, {
    key: "getTSSCommits",
    value: function getTSSCommits() {
      if (!this.privKey) throw CoreError.default("tss pub cannot be returned until you've reconstructed tkey");
      if (!this.metadata) throw CoreError.metadataUndefined();
      var tssPolyCommits = this.metadata.tssPolyCommits[this.tssTag];
      if (!tssPolyCommits) throw CoreError.default("tss poly commits not found for tssTag ".concat(this.tssTag));
      if (tssPolyCommits.length === 0) throw CoreError.default("tss poly commits is empty");
      return tssPolyCommits;
    }
  }, {
    key: "getTSSPub",
    value: function getTSSPub() {
      return this.getTSSCommits()[0];
    }
    /**
     * catchupToLatestShare recursively loops fetches metadata of the provided share and checks if there is an encrypted share for it.
     * @param shareStore - share to start of with
     * @param polyID - if specified, polyID to refresh to if it exists
     */
  }, {
    key: "catchupToLatestShare",
    value: function () {
      var _catchupToLatestShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(params) {
        var shareStore, polyID, includeLocalMetadataTransitions, shareMetadata, nextShare;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shareStore = params.shareStore, polyID = params.polyID, includeLocalMetadataTransitions = params.includeLocalMetadataTransitions;
                _context3.prev = 1;
                _context3.next = 4;
                return this.getAuthMetadata({
                  privKey: shareStore.share.share,
                  includeLocalMetadataTransitions: includeLocalMetadataTransitions
                });
              case 4:
                shareMetadata = _context3.sent;
                _context3.next = 12;
                break;
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                if (!(_context3.t0 && _context3.t0.code === 1308)) {
                  _context3.next = 11;
                  break;
                }
                throw _context3.t0;
              case 11:
                throw CoreError.authMetadataGetUnavailable(", ".concat(prettyPrintError(_context3.t0)));
              case 12:
                _context3.prev = 12;
                if (!polyID) {
                  _context3.next = 16;
                  break;
                }
                if (!(shareStore.polynomialID === polyID)) {
                  _context3.next = 16;
                  break;
                }
                return _context3.abrupt("return", {
                  latestShare: shareStore,
                  shareMetadata: shareMetadata
                });
              case 16:
                _context3.next = 18;
                return shareMetadata.getEncryptedShare(shareStore);
              case 18:
                nextShare = _context3.sent;
                _context3.next = 21;
                return this.catchupToLatestShare({
                  shareStore: nextShare,
                  polyID: polyID,
                  includeLocalMetadataTransitions: includeLocalMetadataTransitions
                });
              case 21:
                return _context3.abrupt("return", _context3.sent);
              case 24:
                _context3.prev = 24;
                _context3.t1 = _context3["catch"](12);
                if (!(_context3.t1 && _context3.t1.code === 1308)) {
                  _context3.next = 28;
                  break;
                }
                throw _context3.t1;
              case 28:
                return _context3.abrupt("return", {
                  latestShare: shareStore,
                  shareMetadata: shareMetadata
                });
              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 7], [12, 24]]);
      }));
      function catchupToLatestShare(_x4) {
        return _catchupToLatestShare.apply(this, arguments);
      }
      return catchupToLatestShare;
    }()
  }, {
    key: "reconstructKey",
    value: function () {
      var _reconstructKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var _this = this;
        var _reconstructKeyMiddleware,
          pubPoly,
          requiredThreshold,
          pubPolyID,
          sharesLeft,
          fullShareList,
          shareIndexesRequired,
          i,
          sharesToInput,
          z,
          sharesForPoly,
          shareIndexesForPoly,
          k,
          currentShareForPoly,
          latestShareRes,
          polyShares,
          shareArr,
          shareIndexArr,
          _i,
          privKey,
          reconstructedPubKey,
          returnObject,
          _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _reconstructKeyMiddleware = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : true;
                if (this.metadata) {
                  _context5.next = 3;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 3:
                pubPoly = this.metadata.getLatestPublicPolynomial();
                requiredThreshold = pubPoly.getThreshold();
                pubPolyID = pubPoly.getPolynomialID(); // check if we have enough shares to meet threshold
                sharesLeft = requiredThreshold; // we don't just check the latest poly but
                // we check if the shares on previous polynomials in our stores have the share indexes we require
                fullShareList = this.metadata.getShareIndexesForPolynomial(pubPolyID);
                shareIndexesRequired = {};
                for (i = 0; i < fullShareList.length; i += 1) {
                  shareIndexesRequired[fullShareList[i]] = true;
                }
                sharesToInput = [];
                z = this.metadata.polyIDList.length - 1;
              case 12:
                if (!(z >= 0 && sharesLeft > 0)) {
                  _context5.next = 40;
                  break;
                }
                sharesForPoly = this.shares[this.metadata.polyIDList[z][0]];
                if (!sharesForPoly) {
                  _context5.next = 37;
                  break;
                }
                shareIndexesForPoly = Object.keys(sharesForPoly);
                k = 0;
              case 17:
                if (!(k < shareIndexesForPoly.length && sharesLeft > 0)) {
                  _context5.next = 37;
                  break;
                }
                if (!(shareIndexesForPoly[k] in shareIndexesRequired)) {
                  _context5.next = 34;
                  break;
                }
                currentShareForPoly = sharesForPoly[shareIndexesForPoly[k]];
                if (!(currentShareForPoly.polynomialID === pubPolyID)) {
                  _context5.next = 24;
                  break;
                }
                sharesToInput.push(currentShareForPoly);
                _context5.next = 32;
                break;
              case 24:
                _context5.next = 26;
                return this.catchupToLatestShare({
                  shareStore: currentShareForPoly,
                  polyID: pubPolyID,
                  includeLocalMetadataTransitions: true
                });
              case 26:
                latestShareRes = _context5.sent;
                if (!(latestShareRes.latestShare.polynomialID === pubPolyID)) {
                  _context5.next = 31;
                  break;
                }
                sharesToInput.push(latestShareRes.latestShare);
                _context5.next = 32;
                break;
              case 31:
                throw new CoreError(1304, "Share found in unexpected polynomial");
              case 32:
                delete shareIndexesRequired[shareIndexesForPoly[k]];
                sharesLeft -= 1;
              case 34:
                k += 1;
                _context5.next = 17;
                break;
              case 37:
                z -= 1;
                _context5.next = 12;
                break;
              case 40:
                // Input shares to ensure atomicity
                sharesToInput.forEach(function (share) {
                  _this.inputShareStore(share);
                });
                if (!(sharesLeft > 0)) {
                  _context5.next = 43;
                  break;
                }
                throw CoreError.unableToReconstruct(" require ".concat(requiredThreshold, " but have ").concat(requiredThreshold - sharesLeft));
              case 43:
                polyShares = Object.keys(this.shares[pubPolyID]);
                shareArr = [];
                shareIndexArr = [];
                for (_i = 0; _i < requiredThreshold; _i += 1) {
                  shareArr.push(this.shares[pubPolyID][polyShares[_i]].share.share);
                  shareIndexArr.push(this.shares[pubPolyID][polyShares[_i]].share.shareIndex);
                }
                privKey = lagrangeInterpolation(shareArr, shareIndexArr); // check that priv key regenerated is correct
                reconstructedPubKey = getPubKeyPoint(privKey);
                if (!(this.metadata.pubKey.x.cmp(reconstructedPubKey.x) !== 0)) {
                  _context5.next = 51;
                  break;
                }
                throw CoreError.incorrectReconstruction();
              case 51:
                this._setKey(privKey);
                returnObject = {
                  privKey: privKey,
                  allKeys: [privKey]
                };
                if (!(_reconstructKeyMiddleware && Object.keys(this._reconstructKeyMiddleware).length > 0)) {
                  _context5.next = 56;
                  break;
                }
                _context5.next = 56;
                return Promise.all(Object.keys(this._reconstructKeyMiddleware).map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(x) {
                    var _returnObject$allKeys, extraKeys;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!Object.prototype.hasOwnProperty.call(_this._reconstructKeyMiddleware, x)) {
                              _context4.next = 6;
                              break;
                            }
                            _context4.next = 3;
                            return _this._reconstructKeyMiddleware[x]();
                          case 3:
                            extraKeys = _context4.sent;
                            returnObject[x] = extraKeys;
                            (_returnObject$allKeys = returnObject.allKeys).push.apply(_returnObject$allKeys, _toConsumableArray(extraKeys));
                          case 6:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }()));
              case 56:
                return _context5.abrupt("return", returnObject);
              case 57:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function reconstructKey() {
        return _reconstructKey.apply(this, arguments);
      }
      return reconstructKey;
    }()
  }, {
    key: "reconstructLatestPoly",
    value: function reconstructLatestPoly() {
      if (!this.metadata) {
        throw CoreError.metadataUndefined();
      }
      var pubPoly = this.metadata.getLatestPublicPolynomial();
      var pubPolyID = pubPoly.getPolynomialID();
      var threshold = pubPoly.getThreshold();
      var pointsArr = [];
      var sharesForExistingPoly = Object.keys(this.shares[pubPolyID]);
      if (sharesForExistingPoly.length < threshold) {
        throw CoreError.unableToReconstruct("not enough shares to reconstruct poly");
      }
      if (new Set(sharesForExistingPoly).size !== sharesForExistingPoly.length) {
        throw CoreError.default("share indexes should be unique");
      }
      for (var i = 0; i < threshold; i += 1) {
        pointsArr.push(new Point(new BN(sharesForExistingPoly[i], "hex"), this.shares[pubPolyID][sharesForExistingPoly[i]].share.share));
      }
      return lagrangeInterpolatePolynomial(pointsArr);
    }
  }, {
    key: "deleteShare",
    value: function () {
      var _deleteShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(shareIndex, useTSS, tssOptions) {
        var _this2 = this;
        var shareIndexToDelete, shareToDelete, pubPoly, previousPolyID, existingShareIndexes, newShareIndexes, factorPub, inputTSSIndex, inputTSSShare, selectedServers, authSignatures, existingFactorPubs, found, updatedFactorPubs, rssNodeDetails, randomSelectedServers, updatedTSSIndexes, results, newShareStores;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.metadata) {
                  _context6.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (this.privKey) {
                  _context6.next = 4;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 4:
                if (!(useTSS && !tssOptions)) {
                  _context6.next = 6;
                  break;
                }
                throw CoreError.default("cannot useTSS if tssOptions is empty");
              case 6:
                shareIndexToDelete = new BN(shareIndex, "hex");
                shareToDelete = this.outputShareStore(shareIndexToDelete);
                if (!(shareIndexToDelete.cmp(new BN("1", "hex")) === 0)) {
                  _context6.next = 10;
                  break;
                }
                throw new CoreError(1001, "Unable to delete service provider share");
              case 10:
                // Get existing shares
                pubPoly = this.metadata.getLatestPublicPolynomial();
                previousPolyID = pubPoly.getPolynomialID();
                existingShareIndexes = this.metadata.getShareIndexesForPolynomial(previousPolyID);
                newShareIndexes = [];
                existingShareIndexes.forEach(function (el) {
                  var bn = new BN(el, "hex");
                  if (bn.cmp(shareIndexToDelete) !== 0) {
                    newShareIndexes.push(bn.toString("hex"));
                  }
                });
                // Update shares
                if (!(existingShareIndexes.length === newShareIndexes.length)) {
                  _context6.next = 19;
                  break;
                }
                throw CoreError.default("Share index does not exist in latest polynomial");
              case 19:
                if (!(newShareIndexes.length < pubPoly.getThreshold())) {
                  _context6.next = 21;
                  break;
                }
                throw CoreError.default("Minimum ".concat(pubPoly.getThreshold(), " shares are required for tkey. Unable to delete share"));
              case 21:
                if (!useTSS) {
                  _context6.next = 38;
                  break;
                }
                factorPub = tssOptions.factorPub, inputTSSIndex = tssOptions.inputTSSIndex, inputTSSShare = tssOptions.inputTSSShare, selectedServers = tssOptions.selectedServers, authSignatures = tssOptions.authSignatures;
                existingFactorPubs = this.metadata.factorPubs[this.tssTag];
                found = existingFactorPubs.filter(function (f) {
                  return f.x.eq(factorPub.x) && f.y.eq(factorPub.y);
                });
                if (!(found.length === 0)) {
                  _context6.next = 27;
                  break;
                }
                throw CoreError.default("could not find factorPub to delete");
              case 27:
                if (!(found.length > 1)) {
                  _context6.next = 29;
                  break;
                }
                throw CoreError.default("found two or more factorPubs that match, error in metadata");
              case 29:
                updatedFactorPubs = existingFactorPubs.filter(function (f) {
                  return !f.x.eq(factorPub.x) || !f.y.eq(factorPub.y);
                });
                this.metadata.addTSSData({
                  tssTag: this.tssTag,
                  factorPubs: updatedFactorPubs
                });
                _context6.next = 33;
                return this._getRssNodeDetails();
              case 33:
                rssNodeDetails = _context6.sent;
                randomSelectedServers = randomSelection(new Array(rssNodeDetails.serverEndpoints.length).fill(null).map(function (_, i) {
                  return i + 1;
                }), Math.ceil(rssNodeDetails.serverEndpoints.length / 2));
                updatedTSSIndexes = updatedFactorPubs.map(function (fb) {
                  return _this2.getFactorEncs(fb).tssIndex;
                });
                _context6.next = 38;
                return this._refreshTSSShares(false, inputTSSShare, inputTSSIndex, updatedFactorPubs, updatedTSSIndexes, this.serviceProvider.getVerifierNameVerifierId(), _objectSpread(_objectSpread({}, rssNodeDetails), {}, {
                  selectedServers: selectedServers || randomSelectedServers,
                  authSignatures: authSignatures
                }));
              case 38:
                _context6.next = 40;
                return this._refreshShares(pubPoly.getThreshold(), [].concat(newShareIndexes), previousPolyID);
              case 40:
                results = _context6.sent;
                newShareStores = results.shareStores;
                _context6.next = 44;
                return this.addLocalMetadataTransitions({
                  input: [{
                    message: SHARE_DELETED,
                    dateAdded: Date.now()
                  }],
                  privKey: [shareToDelete.share.share]
                });
              case 44:
                return _context6.abrupt("return", {
                  newShareStores: newShareStores
                });
              case 45:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function deleteShare(_x6, _x7, _x8) {
        return _deleteShare.apply(this, arguments);
      }
      return deleteShare;
    }()
  }, {
    key: "_getTSSNodeDetails",
    value: function () {
      var _getTSSNodeDetails2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
        var _yield$this$servicePr, serverEndpoints, serverPubKeys, serverThreshold;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.serviceProvider.getTSSNodeDetails();
              case 2:
                _yield$this$servicePr = _context7.sent;
                serverEndpoints = _yield$this$servicePr.serverEndpoints;
                serverPubKeys = _yield$this$servicePr.serverPubKeys;
                serverThreshold = _yield$this$servicePr.serverThreshold;
                if (!(!Array.isArray(serverEndpoints) || serverEndpoints.length === 0)) {
                  _context7.next = 8;
                  break;
                }
                throw new Error("service provider tss server endpoints are missing");
              case 8:
                if (!(!Array.isArray(serverPubKeys) || serverPubKeys.length === 0)) {
                  _context7.next = 10;
                  break;
                }
                throw new Error("service provider pub keys are missing");
              case 10:
                return _context7.abrupt("return", {
                  serverEndpoints: serverEndpoints,
                  serverPubKeys: serverPubKeys,
                  serverThreshold: serverThreshold || Math.floor(serverEndpoints.length / 2) + 1
                });
              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _getTSSNodeDetails() {
        return _getTSSNodeDetails2.apply(this, arguments);
      }
      return _getTSSNodeDetails;
    }()
  }, {
    key: "_getRssNodeDetails",
    value: function () {
      var _getRssNodeDetails2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
        var _yield$this$servicePr2, serverEndpoints, serverPubKeys, serverThreshold;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.serviceProvider.getRSSNodeDetails();
              case 2:
                _yield$this$servicePr2 = _context8.sent;
                serverEndpoints = _yield$this$servicePr2.serverEndpoints;
                serverPubKeys = _yield$this$servicePr2.serverPubKeys;
                serverThreshold = _yield$this$servicePr2.serverThreshold;
                if (!(!Array.isArray(serverEndpoints) || serverEndpoints.length === 0)) {
                  _context8.next = 8;
                  break;
                }
                throw new Error("service provider tss server endpoints are missing");
              case 8:
                if (!(!Array.isArray(serverPubKeys) || serverPubKeys.length === 0)) {
                  _context8.next = 10;
                  break;
                }
                throw new Error("service provider pub keys are missing");
              case 10:
                return _context8.abrupt("return", {
                  serverEndpoints: serverEndpoints,
                  serverPubKeys: serverPubKeys,
                  serverThreshold: serverThreshold || Math.floor(serverEndpoints.length / 2) + 1
                });
              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _getRssNodeDetails() {
        return _getRssNodeDetails2.apply(this, arguments);
      }
      return _getRssNodeDetails;
    }()
  }, {
    key: "generateNewShare",
    value: function () {
      var _generateNewShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(useTSS, tssOptions) {
        var _this3 = this;
        var newFactorPub, inputTSSIndex, inputTSSShare, newTSSIndex, selectedServers, authSignatures, existingFactorPubs, updatedFactorPubs, verifierId, rssNodeDetails, randomSelectedServers, existingTSSIndexes, updatedTSSIndexes, pubPoly, previousPolyID, existingShareIndexes, existingShareIndexesBN, newShareIndex, results, newShareStores;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.metadata) {
                  _context9.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (this.privKey) {
                  _context9.next = 4;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 4:
                if (!useTSS) {
                  _context9.next = 22;
                  break;
                }
                if (tssOptions) {
                  _context9.next = 7;
                  break;
                }
                throw CoreError.default("must provide tss options when calling generateNewShare with useTSS true");
              case 7:
                if (this.metadata.tssPolyCommits[this.tssTag]) {
                  _context9.next = 9;
                  break;
                }
                throw new Error("tss key has not been initialized for tssTag ".concat(this.tssTag));
              case 9:
                newFactorPub = tssOptions.newFactorPub, inputTSSIndex = tssOptions.inputTSSIndex, inputTSSShare = tssOptions.inputTSSShare, newTSSIndex = tssOptions.newTSSIndex, selectedServers = tssOptions.selectedServers, authSignatures = tssOptions.authSignatures;
                existingFactorPubs = this.metadata.factorPubs[this.tssTag];
                updatedFactorPubs = existingFactorPubs.concat([newFactorPub]); // only modify factorPubs
                this.metadata.addTSSData({
                  tssTag: this.tssTag,
                  tssNonce: this.metadata.tssNonces[this.tssTag],
                  tssPolyCommits: this.metadata.tssPolyCommits[this.tssTag],
                  factorPubs: updatedFactorPubs,
                  factorEncs: this.metadata.factorEncs[this.tssTag]
                });
                verifierId = this.serviceProvider.getVerifierNameVerifierId();
                _context9.next = 16;
                return this._getRssNodeDetails();
              case 16:
                rssNodeDetails = _context9.sent;
                randomSelectedServers = randomSelection(new Array(rssNodeDetails.serverEndpoints.length).fill(null).map(function (_, i) {
                  return i + 1;
                }), Math.ceil(rssNodeDetails.serverEndpoints.length / 2));
                existingTSSIndexes = existingFactorPubs.map(function (fb) {
                  return _this3.getFactorEncs(fb).tssIndex;
                });
                updatedTSSIndexes = existingTSSIndexes.concat([newTSSIndex]);
                _context9.next = 22;
                return this._refreshTSSShares(false, inputTSSShare, inputTSSIndex, updatedFactorPubs, updatedTSSIndexes, verifierId, _objectSpread(_objectSpread({}, rssNodeDetails), {}, {
                  selectedServers: selectedServers || randomSelectedServers,
                  authSignatures: authSignatures
                }));
              case 22:
                pubPoly = this.metadata.getLatestPublicPolynomial();
                previousPolyID = pubPoly.getPolynomialID();
                existingShareIndexes = this.metadata.getShareIndexesForPolynomial(previousPolyID);
                existingShareIndexesBN = existingShareIndexes.map(function (el) {
                  return new BN(el, "hex");
                });
                newShareIndex = new BN(generatePrivateExcludingIndexes(existingShareIndexesBN));
                _context9.next = 29;
                return this._refreshShares(pubPoly.getThreshold(), [].concat(_toConsumableArray(existingShareIndexes), [newShareIndex.toString("hex")]), previousPolyID);
              case 29:
                results = _context9.sent;
                newShareStores = results.shareStores;
                return _context9.abrupt("return", {
                  newShareStores: newShareStores,
                  newShareIndex: newShareIndex
                });
              case 32:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function generateNewShare(_x9, _x10) {
        return _generateNewShare.apply(this, arguments);
      }
      return generateNewShare;
    }()
  }, {
    key: "_refreshTSSShares",
    value: function () {
      var _refreshTSSShares2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(updateMetadata, inputShare, inputIndex, factorPubs, targetIndexes, verifierNameVerifierId, serverOpts) {
        var tssCommits, tssPubKeyPoint, tssPubKey, serverEndpoints, serverPubKeys, serverThreshold, selectedServers, authSignatures, rssClient, tssNonce, oldLabel, newLabel, newTSSServerPub, refreshResponses, secondCommit, newTSSCommits, factorEncs, i, refreshResponse;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.metadata) {
                  _context10.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (this.metadata.tssPolyCommits) {
                  _context10.next = 4;
                  break;
                }
                throw CoreError.default("tss poly commits obj not found");
              case 4:
                tssCommits = this.metadata.tssPolyCommits[this.tssTag];
                if (tssCommits) {
                  _context10.next = 7;
                  break;
                }
                throw CoreError.default("tss commits not found for tssTag ".concat(this.tssTag));
              case 7:
                if (!(tssCommits.length === 0)) {
                  _context10.next = 9;
                  break;
                }
                throw CoreError.default("tssCommits is empty");
              case 9:
                tssPubKeyPoint = tssCommits[0];
                tssPubKey = hexPoint(tssPubKeyPoint);
                serverEndpoints = serverOpts.serverEndpoints, serverPubKeys = serverOpts.serverPubKeys, serverThreshold = serverOpts.serverThreshold, selectedServers = serverOpts.selectedServers, authSignatures = serverOpts.authSignatures;
                rssClient = new RSSClient({
                  serverEndpoints: serverEndpoints,
                  serverPubKeys: serverPubKeys,
                  serverThreshold: serverThreshold,
                  tssPubKey: tssPubKey
                });
                if (this.metadata.factorPubs) {
                  _context10.next = 15;
                  break;
                }
                throw CoreError.default("factorPubs obj not found");
              case 15:
                if (factorPubs) {
                  _context10.next = 17;
                  break;
                }
                throw CoreError.default("factorPubs not found for tssTag ".concat(this.tssTag));
              case 17:
                if (!(factorPubs.length === 0)) {
                  _context10.next = 19;
                  break;
                }
                throw CoreError.default("factorPubs is empty");
              case 19:
                if (this.metadata.tssNonces) {
                  _context10.next = 21;
                  break;
                }
                throw CoreError.default("tssNonces obj not found");
              case 21:
                tssNonce = this.metadata.tssNonces[this.tssTag] || 0;
                oldLabel = "".concat(verifierNameVerifierId, "\x15").concat(this.tssTag, "\x16").concat(tssNonce);
                newLabel = "".concat(verifierNameVerifierId, "\x15").concat(this.tssTag, "\x16").concat(tssNonce + 1);
                _context10.next = 26;
                return this.serviceProvider.getTSSPubKey(this.tssTag, tssNonce + 1);
              case 26:
                newTSSServerPub = _context10.sent;
                // eslint-disable-next-line no-console
                console.log("newTSSServerPub", newTSSServerPub.x.toString("hex"), this.tssTag, tssNonce + 1);
                _context10.next = 30;
                return rssClient.refresh({
                  factorPubs: factorPubs.map(function (f) {
                    return hexPoint(f);
                  }),
                  targetIndexes: targetIndexes,
                  oldLabel: oldLabel,
                  newLabel: newLabel,
                  sigs: authSignatures,
                  dkgNewPub: hexPoint(newTSSServerPub),
                  inputShare: inputShare,
                  inputIndex: inputIndex,
                  selectedServers: selectedServers
                });
              case 30:
                refreshResponses = _context10.sent;
                secondCommit = ecPoint(hexPoint(newTSSServerPub)).add(ecPoint(tssPubKey).neg());
                newTSSCommits = [Point.fromJSON(tssPubKey), Point.fromJSON({
                  x: secondCommit.getX().toString(16, 64),
                  y: secondCommit.getY().toString(16, 64)
                })];
                factorEncs = {};
                for (i = 0; i < refreshResponses.length; i++) {
                  refreshResponse = refreshResponses[i];
                  factorEncs[refreshResponse.factorPub.x.padStart(64, "0")] = {
                    type: "hierarchical",
                    tssIndex: refreshResponse.targetIndex,
                    userEnc: refreshResponse.userFactorEnc,
                    serverEncs: refreshResponse.serverFactorEncs
                  };
                }
                this.metadata.addTSSData({
                  tssTag: this.tssTag,
                  tssNonce: tssNonce + 1,
                  tssPolyCommits: newTSSCommits,
                  factorPubs: factorPubs,
                  factorEncs: factorEncs
                });
                if (!updateMetadata) {
                  _context10.next = 39;
                  break;
                }
                _context10.next = 39;
                return this._syncShareMetadata();
              case 39:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function _refreshTSSShares(_x11, _x12, _x13, _x14, _x15, _x16, _x17) {
        return _refreshTSSShares2.apply(this, arguments);
      }
      return _refreshTSSShares;
    }()
  }, {
    key: "_refreshShares",
    value: function () {
      var _refreshShares2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(threshold, newShareIndexes, previousPolyID, useTSS, tssIndex, factorPub) {
        var _this4 = this;
        var poly, shares, existingShareIndexes, pointsArr, sharesForExistingPoly, i, oldPoly, shareIndexesNeedingEncryption, index, shareIndexHex, oldShareStores, newShareStores, polyID, m, newScopedStore, sharesToPush, metadataToPush, moduleName, adjustedGeneralStore, newShareMetadataToPush, newShareStoreSharesToPush, AuthMetadatas, _index, shareIndex;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!useTSS) {
                  _context12.next = 5;
                  break;
                }
                if (tssIndex) {
                  _context12.next = 3;
                  break;
                }
                throw CoreError.default("useTSS is true but tssIndex is not specified / invalid");
              case 3:
                if (factorPub) {
                  _context12.next = 5;
                  break;
                }
                throw CoreError.default("useTSS is true but factorPub is not specified");
              case 5:
                if (this.metadata) {
                  _context12.next = 7;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 7:
                if (this.privKey) {
                  _context12.next = 9;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 9:
                if (!(threshold > newShareIndexes.length)) {
                  _context12.next = 11;
                  break;
                }
                throw CoreError.default("threshold should not be greater than share indexes. ".concat(threshold, " > ").concat(newShareIndexes.length));
              case 11:
                // update metadata nonce
                this.metadata.nonce += 1;
                poly = generateRandomPolynomial(threshold - 1, this.privKey);
                shares = poly.generateShares(newShareIndexes);
                existingShareIndexes = this.metadata.getShareIndexesForPolynomial(previousPolyID);
                pointsArr = [];
                sharesForExistingPoly = Object.keys(this.shares[previousPolyID]);
                if (!(sharesForExistingPoly.length < threshold)) {
                  _context12.next = 19;
                  break;
                }
                throw CoreError.unableToReconstruct("not enough shares for polynomial reconstruction");
              case 19:
                for (i = 0; i < threshold; i += 1) {
                  pointsArr.push(new Point(new BN(sharesForExistingPoly[i], "hex"), this.shares[previousPolyID][sharesForExistingPoly[i]].share.share));
                }
                oldPoly = lagrangeInterpolatePolynomial(pointsArr);
                shareIndexesNeedingEncryption = [];
                for (index = 0; index < existingShareIndexes.length; index += 1) {
                  shareIndexHex = existingShareIndexes[index]; // define shares that need encryption/relaying
                  if (newShareIndexes.includes(shareIndexHex)) {
                    shareIndexesNeedingEncryption.push(shareIndexHex);
                  }
                }
                // add metadata new poly to metadata
                this.metadata.addFromPolynomialAndShares(poly, shares);
                // change to share stores for public storing
                oldShareStores = {};
                newShareStores = {};
                polyID = poly.getPolynomialID();
                newShareIndexes.forEach(function (shareIndexHex) {
                  newShareStores[shareIndexHex] = new ShareStore(shares[shareIndexHex], polyID);
                });
                // evaluate oldPoly for old shares and set new metadata with encrypted share for new polynomial
                m = this.metadata.clone();
                newScopedStore = {};
                _context12.next = 32;
                return Promise.all(shareIndexesNeedingEncryption.map( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(shareIndex) {
                    var oldShare, encryptedShare;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            oldShare = oldPoly.polyEval(new BN(shareIndex, "hex"));
                            _context11.next = 3;
                            return encrypt(getPubKeyECC(oldShare), Buffer.from(JSON.stringify(newShareStores[shareIndex])));
                          case 3:
                            encryptedShare = _context11.sent;
                            newScopedStore[getPubKeyPoint(oldShare).x.toString("hex")] = encryptedShare;
                            oldShareStores[shareIndex] = new ShareStore(new Share(shareIndex, oldShare), previousPolyID);
                            return _context11.abrupt("return", oldShare);
                          case 7:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11);
                  }));
                  return function (_x24) {
                    return _ref4.apply(this, arguments);
                  };
                }()));
              case 32:
                sharesToPush = _context12.sent;
                m.setScopedStore("encryptedShares", newScopedStore);
                metadataToPush = Array(sharesToPush.length).fill(m); // run refreshShare middleware
                // If a shareIndex is left out during refresh shares, we assume that it being explicitly deleted.
                for (moduleName in this._refreshMiddleware) {
                  if (Object.prototype.hasOwnProperty.call(this._refreshMiddleware, moduleName)) {
                    adjustedGeneralStore = this._refreshMiddleware[moduleName](this.metadata.getGeneralStoreDomain(moduleName), oldShareStores, newShareStores);
                    if (!adjustedGeneralStore) this.metadata.deleteGeneralStoreDomain(moduleName);else this.metadata.setGeneralStoreDomain(moduleName, adjustedGeneralStore);
                  }
                }
                newShareMetadataToPush = [];
                newShareStoreSharesToPush = newShareIndexes.map(function (shareIndex) {
                  var me = _this4.metadata.clone();
                  newShareMetadataToPush.push(me);
                  return newShareStores[shareIndex].share.share;
                });
                AuthMetadatas = this.generateAuthMetadata({
                  input: [].concat(_toConsumableArray(metadataToPush), newShareMetadataToPush)
                }); // Combine Authmetadata and service provider ShareStore
                _context12.next = 41;
                return this.addLocalMetadataTransitions({
                  input: [].concat(_toConsumableArray(AuthMetadatas), [newShareStores["1"]]),
                  privKey: [].concat(_toConsumableArray(sharesToPush), _toConsumableArray(newShareStoreSharesToPush), [undefined])
                });
              case 41:
                // update this.shares with these new shares
                for (_index = 0; _index < newShareIndexes.length; _index += 1) {
                  shareIndex = newShareIndexes[_index];
                  this.inputShareStore(newShareStores[shareIndex]);
                }
                // await this.releaseWriteMetadataLock();
                return _context12.abrupt("return", {
                  shareStores: newShareStores
                });
              case 43:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function _refreshShares(_x18, _x19, _x20, _x21, _x22, _x23) {
        return _refreshShares2.apply(this, arguments);
      }
      return _refreshShares;
    }()
  }, {
    key: "_initializeNewTSSKey",
    value: function () {
      var _initializeNewTSSKey2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(tssTag, deviceTSSShare, factorPub, deviceTSSIndex) {
        var tss2, _tssIndex, tss1Pub, tss1PubKey, tss2Pub, tss2PubKey, L1_0, LIndex_0, a0Pub, a1Pub, tssPolyCommits, factorPubs, factorEncs, i, f, factorPubID;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _tssIndex = deviceTSSIndex || 2; // TODO: fix
                if (deviceTSSShare) {
                  tss2 = deviceTSSShare;
                } else {
                  tss2 = new BN(generatePrivate());
                }
                _context13.next = 4;
                return this.serviceProvider.getTSSPubKey(tssTag, 0);
              case 4:
                tss1Pub = _context13.sent;
                tss1PubKey = ecCurve.keyFromPublic({
                  x: tss1Pub.x.toString(16, 64),
                  y: tss1Pub.y.toString(16, 64)
                }).getPublic();
                tss2Pub = getPubKeyPoint(tss2);
                tss2PubKey = ecCurve.keyFromPublic({
                  x: tss2Pub.x.toString(16, 64),
                  y: tss2Pub.y.toString(16, 64)
                }).getPublic();
                L1_0 = getLagrangeCoeffs([1, _tssIndex], 1, 0); // eslint-disable-next-line camelcase
                LIndex_0 = getLagrangeCoeffs([1, _tssIndex], _tssIndex, 0);
                a0Pub = tss1PubKey.mul(L1_0).add(tss2PubKey.mul(LIndex_0));
                a1Pub = tss1PubKey.add(a0Pub.neg());
                tssPolyCommits = [new Point(a0Pub.getX().toString(16, 64), a0Pub.getY().toString(16, 64)), new Point(a1Pub.getX().toString(16, 64), a1Pub.getY().toString(16, 64))];
                factorPubs = [factorPub];
                factorEncs = {};
                i = 0;
              case 16:
                if (!(i < factorPubs.length)) {
                  _context13.next = 28;
                  break;
                }
                f = factorPubs[i];
                factorPubID = f.x.toString(16, 64);
                _context13.t0 = _tssIndex;
                _context13.next = 22;
                return encrypt(Buffer.concat([Buffer.from("04", "hex"), Buffer.from(f.x.toString(16, 64), "hex"), Buffer.from(f.y.toString(16, 64), "hex")]), Buffer.from(tss2.toString(16, 64), "hex"));
              case 22:
                _context13.t1 = _context13.sent;
                _context13.t2 = [];
                factorEncs[factorPubID] = {
                  tssIndex: _context13.t0,
                  type: "direct",
                  userEnc: _context13.t1,
                  serverEncs: _context13.t2
                };
              case 25:
                i++;
                _context13.next = 16;
                break;
              case 28:
                return _context13.abrupt("return", {
                  tss2: tss2,
                  factorEncs: factorEncs,
                  factorPubs: factorPubs,
                  tssPolyCommits: tssPolyCommits
                });
              case 29:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function _initializeNewTSSKey(_x25, _x26, _x27, _x28) {
        return _initializeNewTSSKey2.apply(this, arguments);
      }
      return _initializeNewTSSKey;
    }()
  }, {
    key: "_initializeNewKey",
    value: function () {
      var _initializeNewKey2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14() {
        var _this5 = this;
        var _ref5,
          determinedShare,
          initializeModules,
          importedKey,
          delete1OutOf1,
          tmpPriv,
          shareIndexForDeviceStorage,
          shareIndexes,
          poly,
          shareIndexForDeterminedShare,
          shares,
          metadata,
          serviceProviderShare,
          shareStore,
          metadataToPush,
          sharesToPush,
          authMetadatas,
          index,
          shareIndex,
          result,
          _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _ref5 = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : {}, determinedShare = _ref5.determinedShare, initializeModules = _ref5.initializeModules, importedKey = _ref5.importedKey, delete1OutOf1 = _ref5.delete1OutOf1;
                if (!importedKey) {
                  tmpPriv = generatePrivate();
                  this._setKey(new BN(tmpPriv));
                } else {
                  this._setKey(new BN(importedKey));
                }
                // create a random poly and respective shares
                // 1 is defined as the serviceProvider share
                // 0 is for tKey
                shareIndexForDeviceStorage = generatePrivateExcludingIndexes([new BN(1), new BN(0)]);
                shareIndexes = [new BN(1), shareIndexForDeviceStorage];
                if (determinedShare) {
                  shareIndexForDeterminedShare = generatePrivateExcludingIndexes([new BN(1), new BN(0)]);
                  poly = generateRandomPolynomial(1, this.privKey, [new Share(shareIndexForDeterminedShare, determinedShare)]);
                  shareIndexes.push(shareIndexForDeterminedShare);
                } else {
                  poly = generateRandomPolynomial(1, this.privKey);
                }
                shares = poly.generateShares(shareIndexes); // create metadata to be stored
                metadata = new Metadata(getPubKeyPoint(this.privKey));
                metadata.addFromPolynomialAndShares(poly, shares);
                serviceProviderShare = shares[shareIndexes[0].toString("hex")];
                shareStore = new ShareStore(serviceProviderShare, poly.getPolynomialID());
                this.metadata = metadata;
                // initialize modules
                if (!initializeModules) {
                  _context14.next = 14;
                  break;
                }
                _context14.next = 14;
                return this.initializeModules();
              case 14:
                metadataToPush = [];
                sharesToPush = shareIndexes.map(function (shareIndex) {
                  metadataToPush.push(_this5.metadata);
                  return shares[shareIndex.toString("hex")].share;
                });
                authMetadatas = this.generateAuthMetadata({
                  input: metadataToPush
                }); // because this is the first time we're setting metadata there is no need to acquire a lock
                // acquireLock: false. Force push
                _context14.next = 19;
                return this.addLocalMetadataTransitions({
                  input: [].concat(_toConsumableArray(authMetadatas), [shareStore]),
                  privKey: [].concat(_toConsumableArray(sharesToPush), [undefined])
                });
              case 19:
                if (!delete1OutOf1) {
                  _context14.next = 22;
                  break;
                }
                _context14.next = 22;
                return this.addLocalMetadataTransitions({
                  input: [{
                    message: ONE_KEY_DELETE_NONCE
                  }],
                  privKey: [this.serviceProvider.postboxKey]
                });
              case 22:
                // store metadata on metadata respective to shares
                for (index = 0; index < shareIndexes.length; index += 1) {
                  shareIndex = shareIndexes[index]; // also add into our share store
                  this.inputShareStore(new ShareStore(shares[shareIndex.toString("hex")], poly.getPolynomialID()));
                }
                if (!this.storeDeviceShare) {
                  _context14.next = 26;
                  break;
                }
                _context14.next = 26;
                return this.storeDeviceShare(new ShareStore(shares[shareIndexes[1].toString("hex")], poly.getPolynomialID()));
              case 26:
                result = {
                  privKey: this.privKey,
                  deviceShare: new ShareStore(shares[shareIndexes[1].toString("hex")], poly.getPolynomialID()),
                  userShare: undefined
                };
                if (determinedShare) {
                  result.userShare = new ShareStore(shares[shareIndexes[2].toString("hex")], poly.getPolynomialID());
                }
                return _context14.abrupt("return", result);
              case 29:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function _initializeNewKey() {
        return _initializeNewKey2.apply(this, arguments);
      }
      return _initializeNewKey;
    }()
  }, {
    key: "addLocalMetadataTransitions",
    value: function () {
      var _addLocalMetadataTransitions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(params) {
        var privKey, input;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                privKey = params.privKey, input = params.input;
                this._localMetadataTransitions[0] = [].concat(_toConsumableArray(this._localMetadataTransitions[0]), _toConsumableArray(privKey));
                this._localMetadataTransitions[1] = [].concat(_toConsumableArray(this._localMetadataTransitions[1]), _toConsumableArray(input));
                if (this.manualSync) {
                  _context15.next = 6;
                  break;
                }
                _context15.next = 6;
                return this.syncLocalMetadataTransitions();
              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function addLocalMetadataTransitions(_x29) {
        return _addLocalMetadataTransitions.apply(this, arguments);
      }
      return addLocalMetadataTransitions;
    }()
  }, {
    key: "syncLocalMetadataTransitions",
    value: function () {
      var _syncLocalMetadataTransitions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16() {
        var acquiredLock;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (this.metadata) {
                  _context16.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (Array.isArray(this._localMetadataTransitions[0]) && this._localMetadataTransitions[0].length > 0) {
                  _context16.next = 4;
                  break;
                }
                return _context16.abrupt("return");
              case 4:
                // get lock
                acquiredLock = false;
                if (!this.lastFetchedCloudMetadata) {
                  _context16.next = 9;
                  break;
                }
                _context16.next = 8;
                return this.acquireWriteMetadataLock();
              case 8:
                acquiredLock = true;
              case 9:
                _context16.prev = 9;
                _context16.next = 12;
                return this.storageLayer.setMetadataStream({
                  input: this._localMetadataTransitions[1],
                  privKey: this._localMetadataTransitions[0],
                  serviceProvider: this.serviceProvider
                });
              case 12:
                _context16.next = 17;
                break;
              case 14:
                _context16.prev = 14;
                _context16.t0 = _context16["catch"](9);
                throw CoreError.metadataPostFailed(prettyPrintError(_context16.t0));
              case 17:
                this._localMetadataTransitions = [[], []];
                this.lastFetchedCloudMetadata = this.metadata.clone();
                // release lock
                if (!acquiredLock) {
                  _context16.next = 22;
                  break;
                }
                _context16.next = 22;
                return this.releaseWriteMetadataLock();
              case 22:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[9, 14]]);
      }));
      function syncLocalMetadataTransitions() {
        return _syncLocalMetadataTransitions.apply(this, arguments);
      }
      return syncLocalMetadataTransitions;
    }() // Returns a new instance of metadata with a clean state. All the previous state will be reset.
  }, {
    key: "updateSDK",
    value: function () {
      var _updateSDK = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(params) {
        var _this6 = this;
        var tb, allPolyIDList, lastValidPolyID, shareStoresForLastValidPolyID;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                tb = new ThresholdKey({
                  enableLogging: this.enableLogging,
                  modules: this.modules,
                  serviceProvider: this.serviceProvider,
                  storageLayer: this.storageLayer,
                  manualSync: this.manualSync
                });
                _context17.prev = 1;
                _context17.next = 4;
                return tb.initialize({
                  neverInitializeNewKey: true,
                  withShare: params && params.withShare
                });
              case 4:
                _context17.next = 9;
                break;
              case 6:
                _context17.prev = 6;
                _context17.t0 = _context17["catch"](1);
                throw CoreError.fromCode(1103, "".concat(_context17.t0.message));
              case 9:
                // Delete unnecessary polyIDs and shareStores
                allPolyIDList = tb.metadata.polyIDList;
                Object.keys(this.shares).forEach(function (x) {
                  if (allPolyIDList.find(function (id) {
                    return id[0] === x;
                  })) {
                    lastValidPolyID = x;
                  } else {
                    delete _this6.shares[x];
                  }
                });
                // catchup to latest shareStore for all latest available shares.
                // TODO: fix edge cases where shares are deleted in the newer polynomials
                // TODO: maybe assign this.shares directly rather than output and inputsharestore.
                shareStoresForLastValidPolyID = Object.keys(this.shares[lastValidPolyID]).map(function (x) {
                  return tb.inputShareStoreSafe(_this6.outputShareStore(x, lastValidPolyID));
                });
                _context17.next = 14;
                return Promise.all(shareStoresForLastValidPolyID);
              case 14:
                return _context17.abrupt("return", tb);
              case 15:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[1, 6]]);
      }));
      function updateSDK(_x30) {
        return _updateSDK.apply(this, arguments);
      }
      return updateSDK;
    }() // NOTE: This API will be DEPRECATED in the future in favour of inputShareStoreSafe()
  }, {
    key: "inputShareStore",
    value: function inputShareStore(shareStore) {
      var ss;
      if (shareStore instanceof ShareStore) {
        ss = shareStore;
      } else if (_typeof(shareStore) === "object") {
        ss = ShareStore.fromJSON(shareStore);
      } else {
        throw CoreError.default("can only add type ShareStore into shares");
      }
      if (!(ss.polynomialID in this.shares)) {
        this.shares[ss.polynomialID] = {};
      }
      this.shares[ss.polynomialID][ss.share.shareIndex.toString("hex")] = ss;
    }
    // inputs a share ensuring that the share is the latest share AND metadata is updated to its latest state
  }, {
    key: "inputShareStoreSafe",
    value: function () {
      var _inputShareStoreSafe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(shareStore) {
        var autoUpdateMetadata,
          ss,
          latestShareRes,
          _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                autoUpdateMetadata = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : false;
                if (this.metadata) {
                  _context18.next = 3;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 3:
                if (!(shareStore instanceof ShareStore)) {
                  _context18.next = 7;
                  break;
                }
                ss = shareStore;
                _context18.next = 12;
                break;
              case 7:
                if (!(_typeof(shareStore) === "object")) {
                  _context18.next = 11;
                  break;
                }
                ss = ShareStore.fromJSON(shareStore);
                _context18.next = 12;
                break;
              case 11:
                throw CoreError.default("can only add type ShareStore into shares");
              case 12:
                _context18.next = 14;
                return this.catchupToLatestShare({
                  shareStore: ss,
                  includeLocalMetadataTransitions: true
                });
              case 14:
                latestShareRes = _context18.sent;
                if (this.metadata.polyIDList.find(function (tuple) {
                  return tuple[0] === latestShareRes.latestShare.polynomialID;
                })) {
                  _context18.next = 21;
                  break;
                }
                if (autoUpdateMetadata) {
                  _context18.next = 20;
                  break;
                }
                throw CoreError.default("TKey SDK metadata seems to be outdated because shareIndex: " + "".concat(latestShareRes.latestShare.share.shareIndex.toString("hex"), " has a more recent metadata. Please call updateSDK first"));
              case 20:
                this.metadata = latestShareRes.shareMetadata;
              case 21:
                if (!(latestShareRes.latestShare.polynomialID in this.shares)) {
                  this.shares[latestShareRes.latestShare.polynomialID] = {};
                }
                this.shares[latestShareRes.latestShare.polynomialID][latestShareRes.latestShare.share.shareIndex.toString("hex")] = latestShareRes.latestShare;
              case 23:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function inputShareStoreSafe(_x31) {
        return _inputShareStoreSafe.apply(this, arguments);
      }
      return inputShareStoreSafe;
    }()
  }, {
    key: "outputShareStore",
    value: function outputShareStore(shareIndex, polyID) {
      if (!this.metadata) {
        throw CoreError.metadataUndefined();
      }
      var shareIndexParsed;
      if (typeof shareIndex === "number") {
        shareIndexParsed = new BN(shareIndex);
      } else if (BN.isBN(shareIndex)) {
        shareIndexParsed = shareIndex;
      } else if (typeof shareIndex === "string") {
        shareIndexParsed = new BN(shareIndex, "hex");
      }
      var polyIDToSearch;
      if (polyID) {
        polyIDToSearch = polyID;
      } else {
        polyIDToSearch = this.metadata.getLatestPublicPolynomial().getPolynomialID();
      }
      if (!this.metadata.getShareIndexesForPolynomial(polyIDToSearch).includes(shareIndexParsed.toString("hex"))) {
        throw new CoreError(1002, "no such share index created");
      }
      var shareFromStore = this.shares[polyIDToSearch][shareIndexParsed.toString("hex")];
      if (shareFromStore) return shareFromStore;
      var poly = this.reconstructLatestPoly();
      var shareMap = poly.generateShares([shareIndexParsed]);
      return new ShareStore(shareMap[shareIndexParsed.toString("hex")], polyIDToSearch);
    }
  }, {
    key: "_setKey",
    value: function _setKey(privKey) {
      this.privKey = privKey;
    }
  }, {
    key: "getCurrentShareIndexes",
    value: function getCurrentShareIndexes() {
      if (!this.metadata) {
        throw CoreError.metadataUndefined();
      }
      var latestPolynomial = this.metadata.getLatestPublicPolynomial();
      var latestPolynomialId = latestPolynomial.getPolynomialID();
      var currentShareIndexes = Object.keys(this.shares[latestPolynomialId]);
      return currentShareIndexes;
    }
  }, {
    key: "getKeyDetails",
    value: function getKeyDetails() {
      if (!this.metadata) {
        throw CoreError.metadataUndefined();
      }
      var poly = this.metadata.getLatestPublicPolynomial();
      var previousPolyID = poly.getPolynomialID();
      var requiredShares = poly.getThreshold() - Object.keys(this.shares[previousPolyID]).length;
      var shareDescriptions = this.metadata.getShareDescription();
      if (shareDescriptions) {
        var existingShareIndexes = this.metadata.getShareIndexesForPolynomial(previousPolyID);
        shareDescriptions = Object.keys(shareDescriptions).reduce(function (acc, index) {
          if (existingShareIndexes.indexOf(index) >= 0) acc[index] = shareDescriptions[index];
          return acc;
        }, {});
      }
      return {
        pubKey: this.metadata.pubKey,
        requiredShares: requiredShares,
        threshold: poly.getThreshold(),
        totalShares: this.metadata.getShareIndexesForPolynomial(previousPolyID).length,
        shareDescriptions: shareDescriptions
      };
    }
    // Auth functions
  }, {
    key: "generateAuthMetadata",
    value: function generateAuthMetadata(params) {
      var input = params.input;
      var authMetadatas = [];
      for (var i = 0; i < input.length; i += 1) {
        authMetadatas.push(new AuthMetadata(input[i], this.privKey));
      }
      return authMetadatas;
    }
  }, {
    key: "setAuthMetadata",
    value: function setAuthMetadata(params) {
      var input = params.input,
        serviceProvider = params.serviceProvider,
        privKey = params.privKey;
      var authMetadata = new AuthMetadata(input, this.privKey);
      return this.storageLayer.setMetadata({
        input: authMetadata,
        serviceProvider: serviceProvider,
        privKey: privKey
      });
    }
  }, {
    key: "setAuthMetadataBulk",
    value: function () {
      var _setAuthMetadataBulk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(params) {
        var input, serviceProvider, privKey, authMetadatas, i;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (this.privKey) {
                  _context19.next = 2;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 2:
                input = params.input, serviceProvider = params.serviceProvider, privKey = params.privKey;
                authMetadatas = [];
                for (i = 0; i < input.length; i += 1) {
                  authMetadatas.push(new AuthMetadata(input[i], this.privKey));
                }
                _context19.next = 7;
                return this.addLocalMetadataTransitions({
                  input: authMetadatas,
                  serviceProvider: serviceProvider,
                  privKey: privKey
                });
              case 7:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
      function setAuthMetadataBulk(_x32) {
        return _setAuthMetadataBulk.apply(this, arguments);
      }
      return setAuthMetadataBulk;
    }()
  }, {
    key: "getAuthMetadata",
    value: function () {
      var _getAuthMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(params) {
        var raw, authMetadata;
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return this.getGenericMetadataWithTransitionStates(_objectSpread(_objectSpread({}, params), {}, {
                  fromJSONConstructor: AuthMetadata
                }));
              case 2:
                raw = _context20.sent;
                authMetadata = raw;
                return _context20.abrupt("return", authMetadata.metadata);
              case 5:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));
      function getAuthMetadata(_x33) {
        return _getAuthMetadata.apply(this, arguments);
      }
      return getAuthMetadata;
    }() // fetches the latest metadata potentially searching in local transition states first
  }, {
    key: "getGenericMetadataWithTransitionStates",
    value: function () {
      var _getGenericMetadataWithTransitionStates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21(params) {
        var transitions, index, i, x, raw;
        return _regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                if (params.serviceProvider && params.serviceProvider.postboxKey.toString("hex") !== "0" || params.privKey) {
                  _context21.next = 2;
                  break;
                }
                throw CoreError.default("require either serviceProvider or priv key in getGenericMetadataWithTransitionStates");
              case 2:
                if (!params.includeLocalMetadataTransitions) {
                  _context21.next = 8;
                  break;
                }
                transitions = params._localMetadataTransitions ? params._localMetadataTransitions : this._localMetadataTransitions;
                index = null;
                for (i = transitions[0].length - 1; i >= 0; i -= 1) {
                  x = transitions[0][i];
                  if (params.privKey && x && x.cmp(params.privKey) === 0) index = i;else if (params.serviceProvider && !x) index = i;
                }
                if (!(index !== null)) {
                  _context21.next = 8;
                  break;
                }
                return _context21.abrupt("return", transitions[1][index]);
              case 8:
                _context21.prev = 8;
                _context21.next = 11;
                return this.storageLayer.getMetadata(params);
              case 11:
                raw = _context21.sent;
                _context21.next = 17;
                break;
              case 14:
                _context21.prev = 14;
                _context21.t0 = _context21["catch"](8);
                throw CoreError.metadataGetFailed("".concat(prettyPrintError(_context21.t0)));
              case 17:
                if (!(raw.message === SHARE_DELETED)) {
                  _context21.next = 19;
                  break;
                }
                throw CoreError.fromCode(1308);
              case 19:
                return _context21.abrupt("return", params.fromJSONConstructor.fromJSON(raw));
              case 20:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[8, 14]]);
      }));
      function getGenericMetadataWithTransitionStates(_x34) {
        return _getGenericMetadataWithTransitionStates.apply(this, arguments);
      }
      return getGenericMetadataWithTransitionStates;
    }() // Lock functions
  }, {
    key: "acquireWriteMetadataLock",
    value: function () {
      var _acquireWriteMetadataLock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22() {
        var randomShareStore, latestPolyIDOnCloud, shareIndexesExistInSDK, randomIndex, latestRes, latestMetadata, res;
        return _regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!this.haveWriteMetadataLock) {
                  _context22.next = 2;
                  break;
                }
                return _context22.abrupt("return", this.metadata.nonce);
              case 2:
                if (this.privKey) {
                  _context22.next = 4;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 4:
                latestPolyIDOnCloud = this.lastFetchedCloudMetadata.getLatestPublicPolynomial().getPolynomialID();
                shareIndexesExistInSDK = Object.keys(this.shares[latestPolyIDOnCloud]);
                randomIndex = shareIndexesExistInSDK[Math.floor(Math.random() * (shareIndexesExistInSDK.length - 1))];
                if (shareIndexesExistInSDK.length >= 1) {
                  randomShareStore = this.shares[latestPolyIDOnCloud][randomIndex];
                } else {
                  randomShareStore = this.outputShareStore(randomIndex, latestPolyIDOnCloud);
                }
                _context22.next = 10;
                return this.catchupToLatestShare({
                  shareStore: randomShareStore
                });
              case 10:
                latestRes = _context22.sent;
                latestMetadata = latestRes.shareMetadata; // read errors for what each means
                if (!(latestMetadata.nonce > this.lastFetchedCloudMetadata.nonce)) {
                  _context22.next = 16;
                  break;
                }
                throw CoreError.acquireLockFailed("unable to acquire write access for metadata due to \n      lastFetchedCloudMetadata (".concat(this.lastFetchedCloudMetadata.nonce, ")\n           being lower than last written metadata nonce (").concat(latestMetadata.nonce, "). perhaps update metadata SDK (create new tKey and init)"));
              case 16:
                if (!(latestMetadata.nonce < this.lastFetchedCloudMetadata.nonce)) {
                  _context22.next = 18;
                  break;
                }
                throw CoreError.acquireLockFailed("unable to acquire write access for metadata due to \n      lastFetchedCloudMetadata (".concat(this.lastFetchedCloudMetadata.nonce, ")\n      being higher than last written metadata nonce (").concat(latestMetadata.nonce, "). this should never happen as it \n      should only ever be updated by getting metadata)"));
              case 18:
                _context22.next = 20;
                return this.storageLayer.acquireWriteLock({
                  privKey: this.privKey
                });
              case 20:
                res = _context22.sent;
                if (!(res.status !== 1)) {
                  _context22.next = 23;
                  break;
                }
                throw CoreError.acquireLockFailed("lock cannot be acquired from storage layer status code: ".concat(res.status));
              case 23:
                // increment metadata nonce for write session
                // this.metadata.nonce += 1;
                this.haveWriteMetadataLock = res.id;
                return _context22.abrupt("return", this.metadata.nonce);
              case 25:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
      function acquireWriteMetadataLock() {
        return _acquireWriteMetadataLock.apply(this, arguments);
      }
      return acquireWriteMetadataLock;
    }()
  }, {
    key: "releaseWriteMetadataLock",
    value: function () {
      var _releaseWriteMetadataLock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23() {
        var res;
        return _regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                if (this.haveWriteMetadataLock) {
                  _context23.next = 2;
                  break;
                }
                throw CoreError.releaseLockFailed("releaseWriteMetadataLock - don't have metadata lock to release");
              case 2:
                _context23.next = 4;
                return this.storageLayer.releaseWriteLock({
                  privKey: this.privKey,
                  id: this.haveWriteMetadataLock
                });
              case 4:
                res = _context23.sent;
                if (!(res.status !== 1)) {
                  _context23.next = 7;
                  break;
                }
                throw CoreError.releaseLockFailed("lock cannot be released from storage layer status code: ".concat(res.status));
              case 7:
                this.haveWriteMetadataLock = "";
              case 8:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));
      function releaseWriteMetadataLock() {
        return _releaseWriteMetadataLock.apply(this, arguments);
      }
      return releaseWriteMetadataLock;
    }() // Module functions
  }, {
    key: "_syncShareMetadata",
    value: function () {
      var _syncShareMetadata2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(adjustScopedStore) {
        var shareArray;
        return _regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                if (this.metadata) {
                  _context24.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                shareArray = this.getAllShareStoresForLatestPolynomial().map(function (x) {
                  return x.share.share;
                });
                _context24.next = 5;
                return this.syncMultipleShareMetadata(shareArray, adjustScopedStore);
              case 5:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
      function _syncShareMetadata(_x35) {
        return _syncShareMetadata2.apply(this, arguments);
      }
      return _syncShareMetadata;
    }()
  }, {
    key: "syncMultipleShareMetadata",
    value: function () {
      var _syncMultipleShareMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee26(shares, adjustScopedStore) {
        var _this7 = this;
        var newMetadataPromise, newMetadata;
        return _regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (this.metadata) {
                  _context26.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                this.metadata.nonce += 1;
                newMetadataPromise = shares.map( /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee25(share) {
                    var newMetadata, specificShareMetadata, scopedStoreToBeSet;
                    return _regeneratorRuntime.wrap(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            newMetadata = _this7.metadata.clone();
                            _context25.prev = 1;
                            _context25.next = 4;
                            return _this7.getAuthMetadata({
                              privKey: share,
                              includeLocalMetadataTransitions: true
                            });
                          case 4:
                            specificShareMetadata = _context25.sent;
                            _context25.next = 10;
                            break;
                          case 7:
                            _context25.prev = 7;
                            _context25.t0 = _context25["catch"](1);
                            throw CoreError.authMetadataGetUnavailable("".concat(prettyPrintError(_context25.t0)));
                          case 10:
                            if (adjustScopedStore) {
                              scopedStoreToBeSet = adjustScopedStore(specificShareMetadata.scopedStore);
                            } else {
                              scopedStoreToBeSet = specificShareMetadata.scopedStore;
                            }
                            newMetadata.scopedStore = scopedStoreToBeSet;
                            return _context25.abrupt("return", newMetadata);
                          case 13:
                          case "end":
                            return _context25.stop();
                        }
                      }
                    }, _callee25, null, [[1, 7]]);
                  }));
                  return function (_x38) {
                    return _ref6.apply(this, arguments);
                  };
                }());
                _context26.next = 6;
                return Promise.all(newMetadataPromise);
              case 6:
                newMetadata = _context26.sent;
                return _context26.abrupt("return", this.setAuthMetadataBulk({
                  input: newMetadata,
                  privKey: shares
                }));
              case 8:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
      function syncMultipleShareMetadata(_x36, _x37) {
        return _syncMultipleShareMetadata.apply(this, arguments);
      }
      return syncMultipleShareMetadata;
    }()
  }, {
    key: "_addRefreshMiddleware",
    value: function _addRefreshMiddleware(moduleName, middleware) {
      this._refreshMiddleware[moduleName] = middleware;
    }
  }, {
    key: "_addReconstructKeyMiddleware",
    value: function _addReconstructKeyMiddleware(moduleName, middleware) {
      this._reconstructKeyMiddleware[moduleName] = middleware;
    }
  }, {
    key: "_addShareSerializationMiddleware",
    value: function _addShareSerializationMiddleware(serialize, deserialize) {
      this._shareSerializationMiddleware = {
        serialize: serialize,
        deserialize: deserialize
      };
    }
  }, {
    key: "_setDeviceStorage",
    value: function _setDeviceStorage(storeDeviceStorage) {
      if (this.storeDeviceShare) {
        throw CoreError.default("storeDeviceShare already set");
      }
      this.storeDeviceShare = storeDeviceStorage;
    }
  }, {
    key: "addShareDescription",
    value: function () {
      var _addShareDescription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee27(shareIndex, description, updateMetadata) {
        return _regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (this.metadata) {
                  _context27.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                this.metadata.addShareDescription(shareIndex, description);
                if (!updateMetadata) {
                  _context27.next = 6;
                  break;
                }
                _context27.next = 6;
                return this._syncShareMetadata();
              case 6:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));
      function addShareDescription(_x39, _x40, _x41) {
        return _addShareDescription.apply(this, arguments);
      }
      return addShareDescription;
    }()
  }, {
    key: "deleteShareDescription",
    value: function () {
      var _deleteShareDescription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee28(shareIndex, description, updateMetadata) {
        return _regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (this.metadata) {
                  _context28.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                this.metadata.deleteShareDescription(shareIndex, description);
                if (!updateMetadata) {
                  _context28.next = 6;
                  break;
                }
                _context28.next = 6;
                return this._syncShareMetadata();
              case 6:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));
      function deleteShareDescription(_x42, _x43, _x44) {
        return _deleteShareDescription.apply(this, arguments);
      }
      return deleteShareDescription;
    }()
  }, {
    key: "updateShareDescription",
    value: function () {
      var _updateShareDescription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee29(shareIndex, oldDescription, newDescription, updateMetadata) {
        return _regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                if (this.metadata) {
                  _context29.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                this.metadata.updateShareDescription(shareIndex, oldDescription, newDescription);
                if (!updateMetadata) {
                  _context29.next = 6;
                  break;
                }
                _context29.next = 6;
                return this._syncShareMetadata();
              case 6:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));
      function updateShareDescription(_x45, _x46, _x47, _x48) {
        return _updateShareDescription.apply(this, arguments);
      }
      return updateShareDescription;
    }()
  }, {
    key: "encrypt",
    value: function () {
      var _encrypt2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee30(data) {
        return _regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (this.privKey) {
                  _context30.next = 2;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 2:
                return _context30.abrupt("return", encrypt(getPubKeyECC(this.privKey), data));
              case 3:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));
      function encrypt$1(_x49) {
        return _encrypt2.apply(this, arguments);
      }
      return encrypt$1;
    }()
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee31(encryptedMessage) {
        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (this.privKey) {
                  _context31.next = 2;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 2:
                return _context31.abrupt("return", decrypt(toPrivKeyECC(this.privKey), encryptedMessage));
              case 3:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));
      function decrypt$1(_x50) {
        return _decrypt2.apply(this, arguments);
      }
      return decrypt$1;
    }()
  }, {
    key: "_setTKeyStoreItem",
    value: function () {
      var _setTKeyStoreItem2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee33(moduleName, data) {
        var _this8 = this;
        var rawTkeyStoreItems, decryptedItems, encryptedData, duplicateItemIndex;
        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                if (this.metadata) {
                  _context33.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                rawTkeyStoreItems = this.metadata.getTkeyStoreDomain(moduleName) || [];
                _context33.next = 5;
                return Promise.all(rawTkeyStoreItems.map( /*#__PURE__*/function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee32(x) {
                    var decryptedItem;
                    return _regeneratorRuntime.wrap(function _callee32$(_context32) {
                      while (1) {
                        switch (_context32.prev = _context32.next) {
                          case 0:
                            _context32.next = 2;
                            return _this8.decrypt(x);
                          case 2:
                            decryptedItem = _context32.sent;
                            return _context32.abrupt("return", JSON.parse(decryptedItem.toString()));
                          case 4:
                          case "end":
                            return _context32.stop();
                        }
                      }
                    }, _callee32);
                  }));
                  return function (_x53) {
                    return _ref7.apply(this, arguments);
                  };
                }()));
              case 5:
                decryptedItems = _context33.sent;
                _context33.next = 8;
                return this.encrypt(Buffer.from(stringify(data)));
              case 8:
                encryptedData = _context33.sent;
                duplicateItemIndex = decryptedItems.findIndex(function (x) {
                  return x.id === data.id;
                });
                if (duplicateItemIndex > -1) {
                  rawTkeyStoreItems[duplicateItemIndex] = encryptedData;
                } else {
                  rawTkeyStoreItems.push(encryptedData);
                }
                // update metadataStore
                this.metadata.setTkeyStoreDomain(moduleName, rawTkeyStoreItems);
                _context33.next = 14;
                return this._syncShareMetadata();
              case 14:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));
      function _setTKeyStoreItem(_x51, _x52) {
        return _setTKeyStoreItem2.apply(this, arguments);
      }
      return _setTKeyStoreItem;
    }()
  }, {
    key: "_deleteTKeyStoreItem",
    value: function () {
      var _deleteTKeyStoreItem2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee35(moduleName, id) {
        var _this9 = this;
        var rawTkeyStoreItems, decryptedItems, finalItems;
        return _regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (this.metadata) {
                  _context35.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                rawTkeyStoreItems = this.metadata.getTkeyStoreDomain(moduleName) || [];
                _context35.next = 5;
                return Promise.all(rawTkeyStoreItems.map( /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee34(x) {
                    var decryptedItem;
                    return _regeneratorRuntime.wrap(function _callee34$(_context34) {
                      while (1) {
                        switch (_context34.prev = _context34.next) {
                          case 0:
                            _context34.next = 2;
                            return _this9.decrypt(x);
                          case 2:
                            decryptedItem = _context34.sent;
                            return _context34.abrupt("return", JSON.parse(decryptedItem.toString()));
                          case 4:
                          case "end":
                            return _context34.stop();
                        }
                      }
                    }, _callee34);
                  }));
                  return function (_x56) {
                    return _ref8.apply(this, arguments);
                  };
                }()));
              case 5:
                decryptedItems = _context35.sent;
                finalItems = decryptedItems.filter(function (x) {
                  return x.id !== id;
                });
                this.metadata.setTkeyStoreDomain(moduleName, finalItems);
                _context35.next = 10;
                return this._syncShareMetadata();
              case 10:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));
      function _deleteTKeyStoreItem(_x54, _x55) {
        return _deleteTKeyStoreItem2.apply(this, arguments);
      }
      return _deleteTKeyStoreItem;
    }()
  }, {
    key: "getTKeyStore",
    value: function () {
      var _getTKeyStore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee37(moduleName) {
        var _this10 = this;
        var rawTkeyStoreItems, decryptedItems;
        return _regeneratorRuntime.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                if (this.metadata) {
                  _context37.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                rawTkeyStoreItems = this.metadata.getTkeyStoreDomain(moduleName) || [];
                _context37.next = 5;
                return Promise.all(rawTkeyStoreItems.map( /*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee36(x) {
                    var decryptedItem;
                    return _regeneratorRuntime.wrap(function _callee36$(_context36) {
                      while (1) {
                        switch (_context36.prev = _context36.next) {
                          case 0:
                            _context36.next = 2;
                            return _this10.decrypt(x);
                          case 2:
                            decryptedItem = _context36.sent;
                            return _context36.abrupt("return", JSON.parse(decryptedItem.toString()));
                          case 4:
                          case "end":
                            return _context36.stop();
                        }
                      }
                    }, _callee36);
                  }));
                  return function (_x58) {
                    return _ref9.apply(this, arguments);
                  };
                }()));
              case 5:
                decryptedItems = _context37.sent;
                return _context37.abrupt("return", decryptedItems);
              case 7:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));
      function getTKeyStore(_x57) {
        return _getTKeyStore.apply(this, arguments);
      }
      return getTKeyStore;
    }()
  }, {
    key: "getTKeyStoreItem",
    value: function () {
      var _getTKeyStoreItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee39(moduleName, id) {
        var _this11 = this;
        var rawTkeyStoreItems, decryptedItems, item;
        return _regeneratorRuntime.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                if (this.metadata) {
                  _context39.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                rawTkeyStoreItems = this.metadata.getTkeyStoreDomain(moduleName) || [];
                _context39.next = 5;
                return Promise.all(rawTkeyStoreItems.map( /*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee38(x) {
                    var decryptedItem;
                    return _regeneratorRuntime.wrap(function _callee38$(_context38) {
                      while (1) {
                        switch (_context38.prev = _context38.next) {
                          case 0:
                            _context38.next = 2;
                            return _this11.decrypt(x);
                          case 2:
                            decryptedItem = _context38.sent;
                            return _context38.abrupt("return", JSON.parse(decryptedItem.toString()));
                          case 4:
                          case "end":
                            return _context38.stop();
                        }
                      }
                    }, _callee38);
                  }));
                  return function (_x61) {
                    return _ref10.apply(this, arguments);
                  };
                }()));
              case 5:
                decryptedItems = _context39.sent;
                item = decryptedItems.find(function (x) {
                  return x.id === id;
                });
                return _context39.abrupt("return", item);
              case 8:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));
      function getTKeyStoreItem(_x59, _x60) {
        return _getTKeyStoreItem.apply(this, arguments);
      }
      return getTKeyStoreItem;
    }() // Import export shares
  }, {
    key: "outputShare",
    value: function () {
      var _outputShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee40(shareIndex, type) {
        var share;
        return _regeneratorRuntime.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                share = this.outputShareStore(shareIndex).share.share;
                if (type) {
                  _context40.next = 3;
                  break;
                }
                return _context40.abrupt("return", share);
              case 3:
                return _context40.abrupt("return", this._shareSerializationMiddleware.serialize(share, type));
              case 4:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));
      function outputShare(_x62, _x63) {
        return _outputShare.apply(this, arguments);
      }
      return outputShare;
    }()
  }, {
    key: "inputShare",
    value: function () {
      var _inputShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee41(share, type) {
        var shareStore, deserialized, pubPoly, pubPolyID, fullShareIndexesList;
        return _regeneratorRuntime.wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                if (this.metadata) {
                  _context41.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (type) {
                  _context41.next = 6;
                  break;
                }
                shareStore = this.metadata.shareToShareStore(share);
                _context41.next = 10;
                break;
              case 6:
                _context41.next = 8;
                return this._shareSerializationMiddleware.deserialize(share, type);
              case 8:
                deserialized = _context41.sent;
                shareStore = this.metadata.shareToShareStore(deserialized);
              case 10:
                pubPoly = this.metadata.getLatestPublicPolynomial();
                pubPolyID = pubPoly.getPolynomialID();
                fullShareIndexesList = this.metadata.getShareIndexesForPolynomial(pubPolyID);
                if (fullShareIndexesList.includes(shareStore.share.shareIndex.toString("hex"))) {
                  _context41.next = 15;
                  break;
                }
                throw CoreError.default("Latest poly doesn't include this share");
              case 15:
                _context41.next = 17;
                return this.inputShareStoreSafe(shareStore);
              case 17:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, this);
      }));
      function inputShare(_x64, _x65) {
        return _inputShare.apply(this, arguments);
      }
      return inputShare;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        shares: this.shares,
        tssTag: this.tssTag,
        enableLogging: this.enableLogging,
        privKey: this.privKey ? this.privKey.toString("hex") : undefined,
        metadata: this.metadata,
        lastFetchedCloudMetadata: this.lastFetchedCloudMetadata,
        _localMetadataTransitions: this._localMetadataTransitions,
        manualSync: this.manualSync,
        serviceProvider: this.serviceProvider,
        storageLayer: this.storageLayer
      };
    }
  }, {
    key: "getAllShareStoresForLatestPolynomial",
    value: function getAllShareStoresForLatestPolynomial() {
      var _this12 = this;
      var pubPoly = this.metadata.getLatestPublicPolynomial();
      var pubPolyID = pubPoly.getPolynomialID();
      var existingShareIndexes = this.metadata.getShareIndexesForPolynomial(pubPolyID);
      var threshold = pubPoly.getThreshold();
      var pointsArr = [];
      var sharesForExistingPoly = Object.keys(this.shares[pubPolyID]);
      if (sharesForExistingPoly.length < threshold) {
        throw CoreError.unableToReconstruct("not enough shares for polynomial reconstruction");
      }
      for (var i = 0; i < threshold; i += 1) {
        pointsArr.push(new Point(new BN(sharesForExistingPoly[i], "hex"), this.shares[pubPolyID][sharesForExistingPoly[i]].share.share));
      }
      var currentPoly = lagrangeInterpolatePolynomial(pointsArr);
      var allExistingShares = currentPoly.generateShares(existingShareIndexes);
      var shareArray = existingShareIndexes.map(function (shareIndex) {
        return _this12.metadata.shareToShareStore(allExistingShares[shareIndex].share);
      });
      return shareArray;
    }
    /// Destructive method. All data will be wiped!
    // TODO: tssTag should be different from the user if they decide to delete and recreate tkey
  }, {
    key: "CRITICAL_deleteTkey",
    value: function () {
      var _CRITICAL_deleteTkey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee42() {
        var shareArray;
        return _regeneratorRuntime.wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                if (this.metadata) {
                  _context42.next = 2;
                  break;
                }
                throw CoreError.metadataUndefined();
              case 2:
                if (this.privKey) {
                  _context42.next = 4;
                  break;
                }
                throw CoreError.privateKeyUnavailable();
              case 4:
                if (!(this._localMetadataTransitions[0].length > 0 || this._localMetadataTransitions[1].length > 0)) {
                  _context42.next = 6;
                  break;
                }
                throw CoreError.default("Please sync all local state before calling this function");
              case 6:
                // Construct all shares
                shareArray = this.getAllShareStoresForLatestPolynomial();
                _context42.next = 9;
                return this.addLocalMetadataTransitions({
                  input: [].concat(_toConsumableArray(Array(shareArray.length).fill({
                    message: SHARE_DELETED,
                    dateAdded: Date.now()
                  })), [{
                    message: KEY_NOT_FOUND
                  }]),
                  privKey: [].concat(_toConsumableArray(shareArray.map(function (x) {
                    return x.share.share;
                  })), [undefined])
                });
              case 9:
                _context42.next = 11;
                return this.syncLocalMetadataTransitions();
              case 11:
                // forcesync
                this.privKey = undefined;
                this.metadata = undefined;
                this.shares = {};
                this.lastFetchedCloudMetadata = undefined;
              case 15:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this);
      }));
      function CRITICAL_deleteTkey() {
        return _CRITICAL_deleteTkey.apply(this, arguments);
      }
      return CRITICAL_deleteTkey;
    }()
  }, {
    key: "getApi",
    value: function getApi() {
      return {
        getMetadata: this.getMetadata.bind(this),
        getStorageLayer: this.getStorageLayer.bind(this),
        initialize: this.initialize.bind(this),
        catchupToLatestShare: this.catchupToLatestShare.bind(this),
        _syncShareMetadata: this._syncShareMetadata.bind(this),
        _addRefreshMiddleware: this._addRefreshMiddleware.bind(this),
        _addReconstructKeyMiddleware: this._addReconstructKeyMiddleware.bind(this),
        _addShareSerializationMiddleware: this._addShareSerializationMiddleware.bind(this),
        addShareDescription: this.addShareDescription.bind(this),
        generateNewShare: this.generateNewShare.bind(this),
        inputShareStore: this.inputShareStore.bind(this),
        inputShareStoreSafe: this.inputShareStoreSafe.bind(this),
        outputShareStore: this.outputShareStore.bind(this),
        inputShare: this.inputShare.bind(this),
        outputShare: this.outputShare.bind(this),
        _setDeviceStorage: this._setDeviceStorage.bind(this),
        encrypt: this.encrypt.bind(this),
        decrypt: this.decrypt.bind(this),
        getTKeyStore: this.getTKeyStore.bind(this),
        getTKeyStoreItem: this.getTKeyStoreItem.bind(this),
        _setTKeyStoreItem: this._setTKeyStoreItem.bind(this),
        _deleteTKeyStoreItem: this._deleteTKeyStoreItem.bind(this),
        deleteShare: this.deleteShare.bind(this)
      };
    }
  }, {
    key: "setModuleReferences",
    value: function setModuleReferences() {
      var _this13 = this;
      Object.keys(this.modules).map(function (x) {
        return _this13.modules[x].setModuleReferences(_this13.getApi());
      });
    }
  }, {
    key: "initializeModules",
    value: function () {
      var _initializeModules = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee43() {
        var _this14 = this;
        return _regeneratorRuntime.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                return _context43.abrupt("return", Promise.all(Object.keys(this.modules).map(function (x) {
                  return _this14.modules[x].initialize();
                })));
              case 1:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));
      function initializeModules() {
        return _initializeModules.apply(this, arguments);
      }
      return initializeModules;
    }()
  }], [{
    key: "fromJSON",
    value: function () {
      var _fromJSON = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee44(value, args) {
        var enableLogging, privKey, metadata, shares, _localMetadataTransitions, manualSync, lastFetchedCloudMetadata, tssTag, storageLayer, serviceProvider, modules, tb, key, shareStoreMapElement, shareElementKey, shareStore, AuthMetadataKeys, ShareStoreKeys, sampleMessageMetadata, MessageMetadataKeys, localTransitionShares, localTransitionData, tempMetadata, tempCloud, shareToUseForSerialization, latestPolyIDOnCloud, shareIndexesExistInSDK, randomIndex;
        return _regeneratorRuntime.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                enableLogging = value.enableLogging, privKey = value.privKey, metadata = value.metadata, shares = value.shares, _localMetadataTransitions = value._localMetadataTransitions, manualSync = value.manualSync, lastFetchedCloudMetadata = value.lastFetchedCloudMetadata, tssTag = value.tssTag;
                storageLayer = args.storageLayer, serviceProvider = args.serviceProvider, modules = args.modules;
                tb = new ThresholdKey({
                  tssTag: tssTag,
                  enableLogging: enableLogging,
                  storageLayer: storageLayer,
                  serviceProvider: serviceProvider,
                  modules: modules,
                  manualSync: manualSync
                });
                if (privKey) tb.privKey = new BN(privKey, "hex");
                for (key in shares) {
                  if (Object.prototype.hasOwnProperty.call(shares, key)) {
                    shareStoreMapElement = shares[key];
                    for (shareElementKey in shareStoreMapElement) {
                      if (Object.prototype.hasOwnProperty.call(shareStoreMapElement, shareElementKey)) {
                        shareStore = shareStoreMapElement[shareElementKey];
                        shareStoreMapElement[shareElementKey] = ShareStore.fromJSON(shareStore);
                      }
                    }
                  }
                }
                tb.shares = shares;
                // switch to deserialize local metadata transition based on Object.keys() of authMetadata, ShareStore's and, IMessageMetadata
                AuthMetadataKeys = Object.keys(JSON.parse(stringify(new AuthMetadata(new Metadata(new Point("0", "0")), new BN("0", "hex")))));
                ShareStoreKeys = Object.keys(JSON.parse(stringify(new ShareStore(new Share("0", "0"), ""))));
                sampleMessageMetadata = {
                  message: "Sample message",
                  dateAdded: Date.now()
                };
                MessageMetadataKeys = Object.keys(sampleMessageMetadata);
                localTransitionShares = [];
                localTransitionData = [];
                _localMetadataTransitions[0].forEach(function (x, index) {
                  if (x) {
                    localTransitionShares.push(new BN(x, "hex"));
                  } else {
                    localTransitionShares.push(undefined);
                  }
                  var keys = Object.keys(_localMetadataTransitions[1][index]);
                  if (keys.length === AuthMetadataKeys.length && keys.every(function (val) {
                    return AuthMetadataKeys.includes(val);
                  })) {
                    var tempAuth = AuthMetadata.fromJSON(_localMetadataTransitions[1][index]);
                    tempAuth.privKey = privKey;
                    localTransitionData.push(tempAuth);
                  } else if (keys.length === ShareStoreKeys.length && keys.every(function (val) {
                    return ShareStoreKeys.includes(val);
                  })) {
                    localTransitionData.push(ShareStore.fromJSON(_localMetadataTransitions[1][index]));
                  } else if (keys.length === MessageMetadataKeys.length && keys.every(function (val) {
                    return MessageMetadataKeys.includes(val);
                  })) {
                    localTransitionData.push(_localMetadataTransitions[1][index]);
                  } else {
                    throw CoreError.default("fromJSON failed. Could not deserialise _localMetadataTransitions");
                  }
                });
                if (!(metadata || lastFetchedCloudMetadata)) {
                  _context44.next = 21;
                  break;
                }
                // if service provider key is missing, we should initialize with one of the existing shares
                // TODO: fix for deleted share
                if (tb.serviceProvider.postboxKey.toString("hex") === "0") {
                  latestPolyIDOnCloud = Metadata.fromJSON(lastFetchedCloudMetadata).getLatestPublicPolynomial().getPolynomialID();
                  shareIndexesExistInSDK = Object.keys(shares[latestPolyIDOnCloud]);
                  randomIndex = shareIndexesExistInSDK[Math.floor(Math.random() * (shareIndexesExistInSDK.length - 1))];
                  if (shareIndexesExistInSDK.length >= 1) {
                    shareToUseForSerialization = shares[latestPolyIDOnCloud][randomIndex];
                  }
                }
                if (metadata) tempMetadata = Metadata.fromJSON(metadata);
                if (lastFetchedCloudMetadata) tempCloud = Metadata.fromJSON(lastFetchedCloudMetadata);
                _context44.next = 19;
                return tb.initialize({
                  neverInitializeNewKey: true,
                  transitionMetadata: tempMetadata,
                  previouslyFetchedCloudMetadata: tempCloud,
                  previousLocalMetadataTransitions: [localTransitionShares, localTransitionData],
                  withShare: shareToUseForSerialization
                });
              case 19:
                _context44.next = 23;
                break;
              case 21:
                _context44.next = 23;
                return tb.initialize({
                  neverInitializeNewKey: true
                });
              case 23:
                return _context44.abrupt("return", tb);
              case 24:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44);
      }));
      function fromJSON(_x66, _x67) {
        return _fromJSON.apply(this, arguments);
      }
      return fromJSON;
    }()
  }]);
  return ThresholdKey;
}();

export { AuthMetadata, CoreError, Metadata, ThresholdKey as default, dotProduct, generateRandomPolynomial, getLagrangeCoeffs, kCombinations, lagrangeInterpolatePolynomial, lagrangeInterpolation, polyCommitmentEval };
//# sourceMappingURL=core.esm.js.map
