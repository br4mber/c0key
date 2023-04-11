import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _get from '@babel/runtime/helpers/get';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import TKey from '@tkey/core';
import { ServiceProviderBase } from '@tkey/service-provider-base';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import { SHARE_SERIALIZATION_MODULE_NAME, ShareSerializationModule } from '@tkey/share-serialization';
import { SHARE_TRANSFER_MODULE_NAME, ShareTransferModule } from '@tkey/share-transfer';
import { TorusStorageLayer, MockStorageLayer } from '@tkey/storage-layer-torus';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ThresholdKey = /*#__PURE__*/function (_TKey) {
  _inherits(ThresholdKey, _TKey);
  var _super = _createSuper(ThresholdKey);
  function ThresholdKey(args) {
    var _defaultModules;
    _classCallCheck(this, ThresholdKey);
    var _ref = args || {},
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? {} : _ref$modules,
      serviceProvider = _ref.serviceProvider,
      storageLayer = _ref.storageLayer,
      customAuthArgs = _ref.customAuthArgs,
      serverTimeOffset = _ref.serverTimeOffset;
    var defaultModules = (_defaultModules = {}, _defineProperty(_defaultModules, SHARE_TRANSFER_MODULE_NAME, new ShareTransferModule()), _defineProperty(_defaultModules, SHARE_SERIALIZATION_MODULE_NAME, new ShareSerializationModule()), _defaultModules);
    var finalServiceProvider;
    var finalStorageLayer;
    if (!serviceProvider) {
      finalServiceProvider = new TorusServiceProvider({
        customAuthArgs: customAuthArgs
      });
    } else {
      finalServiceProvider = serviceProvider;
    }
    if (!storageLayer) {
      finalStorageLayer = new TorusStorageLayer({
        hostUrl: "https://metadata.tor.us",
        serverTimeOffset: serverTimeOffset
      });
    } else {
      finalStorageLayer = storageLayer;
    }
    return _super.call(this, _objectSpread(_objectSpread({}, args || {}), {}, {
      modules: _objectSpread(_objectSpread({}, defaultModules), modules),
      serviceProvider: finalServiceProvider,
      storageLayer: finalStorageLayer
    }));
  }
  _createClass(ThresholdKey, null, [{
    key: "fromJSON",
    value: function () {
      var _fromJSON = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(value, args) {
        var _defaultModules2;
        var tempOldStorageLayer, tempOldServiceProvider, _ref2, storageLayer, serviceProvider, _ref2$modules, modules, customAuthArgs, _ref2$serverTimeOffse, serverTimeOffset, defaultModules, finalServiceProvider, finalStorageLayer;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tempOldStorageLayer = value.storageLayer, tempOldServiceProvider = value.serviceProvider;
                _ref2 = args || {}, storageLayer = _ref2.storageLayer, serviceProvider = _ref2.serviceProvider, _ref2$modules = _ref2.modules, modules = _ref2$modules === void 0 ? {} : _ref2$modules, customAuthArgs = _ref2.customAuthArgs, _ref2$serverTimeOffse = _ref2.serverTimeOffset, serverTimeOffset = _ref2$serverTimeOffse === void 0 ? 0 : _ref2$serverTimeOffse;
                defaultModules = (_defaultModules2 = {}, _defineProperty(_defaultModules2, SHARE_TRANSFER_MODULE_NAME, new ShareTransferModule()), _defineProperty(_defaultModules2, SHARE_SERIALIZATION_MODULE_NAME, new ShareSerializationModule()), _defaultModules2);
                finalServiceProvider = serviceProvider || TorusServiceProvider.fromJSON(tempOldServiceProvider) || ServiceProviderBase.fromJSON(tempOldServiceProvider) || new TorusServiceProvider({
                  customAuthArgs: customAuthArgs
                });
                tempOldStorageLayer.serviceProvider = finalServiceProvider;
                finalStorageLayer = storageLayer || MockStorageLayer.fromJSON(tempOldStorageLayer) || TorusStorageLayer.fromJSON(tempOldStorageLayer) || new TorusStorageLayer({
                  hostUrl: "https://metadata.tor.us",
                  serverTimeOffset: serverTimeOffset
                });
                return _context.abrupt("return", _get(_getPrototypeOf(ThresholdKey), "fromJSON", this).call(this, value, _objectSpread(_objectSpread({}, args || {}), {}, {
                  modules: _objectSpread(_objectSpread({}, defaultModules), modules),
                  serviceProvider: finalServiceProvider,
                  storageLayer: finalStorageLayer
                })));
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function fromJSON(_x, _x2) {
        return _fromJSON.apply(this, arguments);
      }
      return fromJSON;
    }()
  }]);
  return ThresholdKey;
}(TKey);

export { ThresholdKey as default };
//# sourceMappingURL=default.esm.js.map
