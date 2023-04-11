import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { TkeyError, PublicShare, ecCurve, ShareStore, Share, isEmptyObject } from '@tkey/common-types';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import BN from 'bn.js';
import { keccak256 } from 'web3-utils';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SecurityQuestionsError = /*#__PURE__*/function (_TkeyError) {
  _inherits(SecurityQuestionsError, _TkeyError);
  var _super = _createSuper(SecurityQuestionsError);
  function SecurityQuestionsError(code, message) {
    var _this;
    _classCallCheck(this, SecurityQuestionsError);
    // takes care of stack and proto
    _this = _super.call(this, code, message);
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(_assertThisInitialized(_this), "name", {
      value: "SecurityQuestionsError"
    });
    return _this;
  }
  _createClass(SecurityQuestionsError, null, [{
    key: "fromCode",
    value: function fromCode(code) {
      var extraMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return new SecurityQuestionsError(code, "".concat(SecurityQuestionsError.messages[code]).concat(extraMessage));
    }
    // Custom methods
  }, {
    key: "unavailable",
    value: function unavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2101, extraMessage);
    }
  }, {
    key: "unableToReplace",
    value: function unableToReplace() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2102, extraMessage);
    }
  }, {
    key: "incorrectAnswer",
    value: function incorrectAnswer() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2103, extraMessage);
    }
  }, {
    key: "noPasswordSaved",
    value: function noPasswordSaved() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2104, extraMessage);
    }
  }]);
  return SecurityQuestionsError;
}(TkeyError);
_defineProperty(SecurityQuestionsError, "messages", {
  2101: "security questions might not exist/be setup",
  2102: "security questions exists, cant replace, maybe change?",
  2103: "Incorrect answer",
  2104: "no password saved on tkeyStore"
});

var SecurityQuestionStore = /*#__PURE__*/function () {
  function SecurityQuestionStore(_ref) {
    var nonce = _ref.nonce,
      shareIndex = _ref.shareIndex,
      sqPublicShare = _ref.sqPublicShare,
      polynomialID = _ref.polynomialID,
      questions = _ref.questions;
    _classCallCheck(this, SecurityQuestionStore);
    _defineProperty(this, "nonce", void 0);
    _defineProperty(this, "shareIndex", void 0);
    _defineProperty(this, "sqPublicShare", void 0);
    _defineProperty(this, "polynomialID", void 0);
    _defineProperty(this, "questions", void 0);
    this.nonce = new BN(nonce, "hex");
    this.shareIndex = new BN(shareIndex, "hex");
    this.sqPublicShare = new PublicShare(sqPublicShare.shareIndex, sqPublicShare.shareCommitment);
    this.polynomialID = polynomialID;
    this.questions = questions;
  }
  _createClass(SecurityQuestionStore, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        nonce: this.nonce.toString("hex"),
        shareIndex: this.shareIndex.toString("hex"),
        sqPublicShare: this.sqPublicShare,
        polynomialID: this.polynomialID.toString(),
        questions: this.questions
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var nonce = value.nonce,
        shareIndex = value.shareIndex,
        sqPublicShare = value.sqPublicShare,
        polynomialID = value.polynomialID,
        questions = value.questions;
      return new SecurityQuestionStore({
        nonce: new BN(nonce, "hex"),
        shareIndex: new BN(shareIndex, "hex"),
        sqPublicShare: PublicShare.fromJSON(sqPublicShare),
        polynomialID: polynomialID,
        questions: questions
      });
    }
  }]);
  return SecurityQuestionStore;
}();

function answerToUserInputHashBN(answerString) {
  return new BN(keccak256(answerString).slice(2), "hex");
}
var SECURITY_QUESTIONS_MODULE_NAME = "securityQuestions";
var TKEYSTORE_ID = "answer";
var SecurityQuestionsModule = /*#__PURE__*/function () {
  function SecurityQuestionsModule(saveAnswers) {
    _classCallCheck(this, SecurityQuestionsModule);
    _defineProperty(this, "moduleName", void 0);
    _defineProperty(this, "tbSDK", void 0);
    _defineProperty(this, "saveAnswers", void 0);
    this.saveAnswers = saveAnswers;
    this.moduleName = SECURITY_QUESTIONS_MODULE_NAME;
  }
  _createClass(SecurityQuestionsModule, [{
    key: "setModuleReferences",
    value: function setModuleReferences(tbSDK) {
      this.tbSDK = tbSDK;
      this.tbSDK._addRefreshMiddleware(this.moduleName, SecurityQuestionsModule.refreshSecurityQuestionsMiddleware);
    }
    // eslint-disable-next-line
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "generateNewShareWithSecurityQuestions",
    value: function () {
      var _generateNewShareWithSecurityQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(answerString, questions) {
        var metadata, rawSqStore, newSharesDetails, newShareStore, userInputHash, nonce, sqStore;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                metadata = this.tbSDK.getMetadata(); // TODO: throw in case of TSS
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (!rawSqStore) {
                  _context2.next = 4;
                  break;
                }
                throw SecurityQuestionsError.unableToReplace();
              case 4:
                _context2.next = 6;
                return this.tbSDK.generateNewShare();
              case 6:
                newSharesDetails = _context2.sent;
                newShareStore = newSharesDetails.newShareStores[newSharesDetails.newShareIndex.toString("hex")];
                userInputHash = answerToUserInputHashBN(answerString);
                nonce = newShareStore.share.share.sub(userInputHash);
                nonce = nonce.umod(ecCurve.curve.n);
                sqStore = new SecurityQuestionStore({
                  nonce: nonce,
                  questions: questions,
                  sqPublicShare: newShareStore.share.getPublicShare(),
                  shareIndex: newShareStore.share.shareIndex,
                  polynomialID: newShareStore.polynomialID
                });
                metadata.setGeneralStoreDomain(this.moduleName, sqStore);
                _context2.next = 15;
                return this.tbSDK.addShareDescription(newSharesDetails.newShareIndex.toString("hex"), JSON.stringify({
                  module: this.moduleName,
                  questions: questions,
                  dateAdded: Date.now()
                }), false // READ TODO1 (don't sync metadata)
                );
              case 15:
                _context2.next = 17;
                return this.saveAnswerOnTkeyStore(answerString);
              case 17:
                _context2.next = 19;
                return this.tbSDK._syncShareMetadata();
              case 19:
                return _context2.abrupt("return", newSharesDetails);
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function generateNewShareWithSecurityQuestions(_x, _x2) {
        return _generateNewShareWithSecurityQuestions.apply(this, arguments);
      }
      return generateNewShareWithSecurityQuestions;
    }()
  }, {
    key: "getSecurityQuestions",
    value: function getSecurityQuestions() {
      var metadata = this.tbSDK.getMetadata();
      var sqStore = new SecurityQuestionStore(metadata.getGeneralStoreDomain(this.moduleName));
      return sqStore.questions;
    }
  }, {
    key: "inputShareFromSecurityQuestions",
    value: function () {
      var _inputShareFromSecurityQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(answerString) {
        var metadata, rawSqStore, sqStore, userInputHash, share, shareStore, derivedPublicShare, latestShareDetails;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (rawSqStore) {
                  _context3.next = 4;
                  break;
                }
                throw SecurityQuestionsError.unavailable();
              case 4:
                sqStore = new SecurityQuestionStore(rawSqStore);
                userInputHash = answerToUserInputHashBN(answerString);
                share = sqStore.nonce.add(userInputHash);
                share = share.umod(ecCurve.curve.n);
                shareStore = new ShareStore(new Share(sqStore.shareIndex, share), sqStore.polynomialID); // validate if share is correct
                derivedPublicShare = shareStore.share.getPublicShare();
                if (!(derivedPublicShare.shareCommitment.x.cmp(sqStore.sqPublicShare.shareCommitment.x) !== 0)) {
                  _context3.next = 12;
                  break;
                }
                throw SecurityQuestionsError.incorrectAnswer();
              case 12:
                _context3.next = 14;
                return this.tbSDK.catchupToLatestShare({
                  shareStore: shareStore,
                  includeLocalMetadataTransitions: true
                });
              case 14:
                latestShareDetails = _context3.sent;
                // TODO: update share nonce on all metadata. would be cleaner in long term?
                // if (shareStore.polynomialID !== latestShareDetails.latestShare.polynomialID) this.storeDeviceShare(latestShareDetails.latestShare);
                this.tbSDK.inputShareStore(latestShareDetails.latestShare);
              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function inputShareFromSecurityQuestions(_x3) {
        return _inputShareFromSecurityQuestions.apply(this, arguments);
      }
      return inputShareFromSecurityQuestions;
    }()
  }, {
    key: "changeSecurityQuestionAndAnswer",
    value: function () {
      var _changeSecurityQuestionAndAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(newAnswerString, newQuestions) {
        var metadata, rawSqStore, sqStore, userInputHash, sqShare, nonce, newSqStore;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (rawSqStore) {
                  _context4.next = 4;
                  break;
                }
                throw SecurityQuestionsError.unavailable();
              case 4:
                sqStore = new SecurityQuestionStore(rawSqStore);
                userInputHash = answerToUserInputHashBN(newAnswerString);
                sqShare = this.tbSDK.outputShareStore(sqStore.shareIndex);
                nonce = sqShare.share.share.sub(userInputHash);
                nonce = nonce.umod(ecCurve.curve.n);
                newSqStore = new SecurityQuestionStore({
                  nonce: nonce,
                  polynomialID: sqStore.polynomialID,
                  sqPublicShare: sqStore.sqPublicShare,
                  shareIndex: sqStore.shareIndex,
                  questions: newQuestions
                });
                metadata.setGeneralStoreDomain(this.moduleName, newSqStore);
                _context4.next = 13;
                return this.saveAnswerOnTkeyStore(newAnswerString);
              case 13:
                _context4.next = 15;
                return this.tbSDK._syncShareMetadata();
              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function changeSecurityQuestionAndAnswer(_x4, _x5) {
        return _changeSecurityQuestionAndAnswer.apply(this, arguments);
      }
      return changeSecurityQuestionAndAnswer;
    }()
  }, {
    key: "saveAnswerOnTkeyStore",
    value: function () {
      var _saveAnswerOnTkeyStore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(answerString) {
        var answerStore;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.saveAnswers) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                answerStore = {
                  answer: answerString,
                  id: TKEYSTORE_ID
                };
                _context5.next = 5;
                return this.tbSDK._setTKeyStoreItem(this.moduleName, answerStore, false);
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function saveAnswerOnTkeyStore(_x6) {
        return _saveAnswerOnTkeyStore.apply(this, arguments);
      }
      return saveAnswerOnTkeyStore;
    }()
  }, {
    key: "getAnswer",
    value: function () {
      var _getAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var answerStore;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.saveAnswers) {
                  _context6.next = 5;
                  break;
                }
                _context6.next = 3;
                return this.tbSDK.getTKeyStoreItem(this.moduleName, TKEYSTORE_ID);
              case 3:
                answerStore = _context6.sent;
                return _context6.abrupt("return", answerStore.answer);
              case 5:
                throw SecurityQuestionsError.noPasswordSaved();
              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getAnswer() {
        return _getAnswer.apply(this, arguments);
      }
      return getAnswer;
    }()
  }], [{
    key: "refreshSecurityQuestionsMiddleware",
    value: function refreshSecurityQuestionsMiddleware(generalStore, oldShareStores, newShareStores) {
      if (generalStore === undefined || isEmptyObject(generalStore)) {
        return generalStore;
      }
      var sqStore = new SecurityQuestionStore(generalStore);
      var sqIndex = sqStore.shareIndex.toString("hex");
      // Assumption: If sqIndex doesn't exist, it must have been explicitly deleted.
      if (oldShareStores[sqIndex] && newShareStores[sqIndex]) {
        var sqAnswer = oldShareStores[sqIndex].share.share.sub(sqStore.nonce);
        var newNonce = newShareStores[sqIndex].share.share.sub(sqAnswer);
        newNonce = newNonce.umod(ecCurve.curve.n);
        return new SecurityQuestionStore({
          nonce: newNonce,
          polynomialID: newShareStores[Object.keys(newShareStores)[0]].polynomialID,
          sqPublicShare: newShareStores[sqIndex].share.getPublicShare(),
          shareIndex: sqStore.shareIndex,
          questions: sqStore.questions
        });
      }
      return undefined;
    }
  }]);
  return SecurityQuestionsModule;
}();

export { SECURITY_QUESTIONS_MODULE_NAME, SecurityQuestionStore, SecurityQuestionsError, SecurityQuestionsModule, SecurityQuestionsModule as default };
//# sourceMappingURL=securityQuestions.esm.js.map
