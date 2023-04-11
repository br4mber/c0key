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
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/get"
const get_namespaceObject = require("@babel/runtime/helpers/get");
var get_default = /*#__PURE__*/__webpack_require__.n(get_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/inherits"
const inherits_namespaceObject = require("@babel/runtime/helpers/inherits");
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
const possibleConstructorReturn_namespaceObject = require("@babel/runtime/helpers/possibleConstructorReturn");
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/getPrototypeOf"
const getPrototypeOf_namespaceObject = require("@babel/runtime/helpers/getPrototypeOf");
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "@tkey/core"
const core_namespaceObject = require("@tkey/core");
var core_default = /*#__PURE__*/__webpack_require__.n(core_namespaceObject);
;// CONCATENATED MODULE: external "@tkey/service-provider-base"
const service_provider_base_namespaceObject = require("@tkey/service-provider-base");
;// CONCATENATED MODULE: external "@tkey/service-provider-torus"
const service_provider_torus_namespaceObject = require("@tkey/service-provider-torus");
;// CONCATENATED MODULE: external "@tkey/share-serialization"
const share_serialization_namespaceObject = require("@tkey/share-serialization");
;// CONCATENATED MODULE: external "@tkey/share-transfer"
const share_transfer_namespaceObject = require("@tkey/share-transfer");
;// CONCATENATED MODULE: external "@tkey/storage-layer-torus"
const storage_layer_torus_namespaceObject = require("@tkey/storage-layer-torus");
;// CONCATENATED MODULE: ./src/index.ts









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ThresholdKey = /*#__PURE__*/function (_TKey) {
  inherits_default()(ThresholdKey, _TKey);
  var _super = _createSuper(ThresholdKey);
  function ThresholdKey(args) {
    var _defaultModules;
    classCallCheck_default()(this, ThresholdKey);
    var _ref = args || {},
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? {} : _ref$modules,
      serviceProvider = _ref.serviceProvider,
      storageLayer = _ref.storageLayer,
      customAuthArgs = _ref.customAuthArgs,
      serverTimeOffset = _ref.serverTimeOffset;
    var defaultModules = (_defaultModules = {}, defineProperty_default()(_defaultModules, share_transfer_namespaceObject.SHARE_TRANSFER_MODULE_NAME, new share_transfer_namespaceObject.ShareTransferModule()), defineProperty_default()(_defaultModules, share_serialization_namespaceObject.SHARE_SERIALIZATION_MODULE_NAME, new share_serialization_namespaceObject.ShareSerializationModule()), _defaultModules);
    var finalServiceProvider;
    var finalStorageLayer;
    if (!serviceProvider) {
      finalServiceProvider = new service_provider_torus_namespaceObject.TorusServiceProvider({
        customAuthArgs: customAuthArgs
      });
    } else {
      finalServiceProvider = serviceProvider;
    }
    if (!storageLayer) {
      finalStorageLayer = new storage_layer_torus_namespaceObject.TorusStorageLayer({
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
  createClass_default()(ThresholdKey, null, [{
    key: "fromJSON",
    value: function () {
      var _fromJSON = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(value, args) {
        var _defaultModules2;
        var tempOldStorageLayer, tempOldServiceProvider, _ref2, storageLayer, serviceProvider, _ref2$modules, modules, customAuthArgs, _ref2$serverTimeOffse, serverTimeOffset, defaultModules, finalServiceProvider, finalStorageLayer;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tempOldStorageLayer = value.storageLayer, tempOldServiceProvider = value.serviceProvider;
                _ref2 = args || {}, storageLayer = _ref2.storageLayer, serviceProvider = _ref2.serviceProvider, _ref2$modules = _ref2.modules, modules = _ref2$modules === void 0 ? {} : _ref2$modules, customAuthArgs = _ref2.customAuthArgs, _ref2$serverTimeOffse = _ref2.serverTimeOffset, serverTimeOffset = _ref2$serverTimeOffse === void 0 ? 0 : _ref2$serverTimeOffse;
                defaultModules = (_defaultModules2 = {}, defineProperty_default()(_defaultModules2, share_transfer_namespaceObject.SHARE_TRANSFER_MODULE_NAME, new share_transfer_namespaceObject.ShareTransferModule()), defineProperty_default()(_defaultModules2, share_serialization_namespaceObject.SHARE_SERIALIZATION_MODULE_NAME, new share_serialization_namespaceObject.ShareSerializationModule()), _defaultModules2);
                finalServiceProvider = serviceProvider || service_provider_torus_namespaceObject.TorusServiceProvider.fromJSON(tempOldServiceProvider) || service_provider_base_namespaceObject.ServiceProviderBase.fromJSON(tempOldServiceProvider) || new service_provider_torus_namespaceObject.TorusServiceProvider({
                  customAuthArgs: customAuthArgs
                });
                tempOldStorageLayer.serviceProvider = finalServiceProvider;
                finalStorageLayer = storageLayer || storage_layer_torus_namespaceObject.MockStorageLayer.fromJSON(tempOldStorageLayer) || storage_layer_torus_namespaceObject.TorusStorageLayer.fromJSON(tempOldStorageLayer) || new storage_layer_torus_namespaceObject.TorusStorageLayer({
                  hostUrl: "https://metadata.tor.us",
                  serverTimeOffset: serverTimeOffset
                });
                return _context.abrupt("return", get_default()(getPrototypeOf_default()(ThresholdKey), "fromJSON", this).call(this, value, _objectSpread(_objectSpread({}, args || {}), {}, {
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
}((core_default()));
/* harmony default export */ const src = (ThresholdKey);
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=default-bundled.cjs.js.map