(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require("react"), require("react-dom"));
  else if (typeof define === 'function' && define.amd)
    define(["react", "react-dom"], factory);
  else {
    var a = typeof exports === 'object' ? factory(require("react"), require("react-dom")) : factory(root["React"], root["ReactDOM"]);
    for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
  }
})(self, function (__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
  return /******/ (() => { // webpackBootstrap
    /******/
    "use strict";
    /******/
    var __webpack_modules__ = ({

      /***/ "react":
      /*!**************************************************************************************!*\
        !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
        \**************************************************************************************/
      /***/ ((module) => {

        module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

        /***/
      }),

      /***/ "react-dom":
      /*!*****************************************************************************************************!*\
        !*** external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"} ***!
        \*****************************************************************************************************/
      /***/ ((module) => {

        module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

        /***/
      }),

      /***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
      /*!************************************************************!*\
        !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
        \************************************************************/
      /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */   "default": () => (/* binding */ _extends)
          /* harmony export */
        });

        function _extends() {
          _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];

              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }

            return target;
          };

          return _extends.apply(this, arguments);
        }

        /***/
      })

      /******/
    });
    /************************************************************************/
    /******/ 	// The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/ 		// Check if module is in cache
      /******/
      var cachedModule = __webpack_module_cache__[moduleId];
      /******/
      if (cachedModule !== undefined) {
        /******/
        return cachedModule.exports;
        /******/
      }
      /******/ 		// Create a new module (and put it into the cache)
      /******/
      var module = __webpack_module_cache__[moduleId] = {
        /******/ 			// no module.id needed
        /******/ 			// no module.loaded needed
        /******/      exports: {}
        /******/
      };
      /******/
      /******/ 		// Execute the module function
      /******/
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      /******/
      /******/ 		// Return the exports of the module
      /******/
      return module.exports;
      /******/
    }

    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/compat get default export */
    /******/
    (() => {
      /******/ 		// getDefaultExport function for compatibility with non-harmony modules
      /******/
      __webpack_require__.n = (module) => {
        /******/
        var getter = module && module.__esModule ?
          /******/        () => (module['default']) :
          /******/        () => (module);
        /******/
        __webpack_require__.d(getter, {a: getter});
        /******/
        return getter;
        /******/
      };
      /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/define property getters */
    /******/
    (() => {
      /******/ 		// define getter functions for harmony exports
      /******/
      __webpack_require__.d = (exports, definition) => {
        /******/
        for (var key in definition) {
          /******/
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            /******/
            Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/
    (() => {
      /******/
      __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/
    (() => {
      /******/ 		// define __esModule on exports
      /******/
      __webpack_require__.r = (exports) => {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
          /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', {value: true});
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      /*!*************************!*\
        !*** ./subApp/index.js ***!
        \*************************/
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */
      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   "init": () => (/* binding */ init),
        /* harmony export */   "forceInit": () => (/* binding */ forceInit),
        /* harmony export */   "render": () => (/* binding */ render),
        /* harmony export */   "destroy": () => (/* binding */ destroy),
        /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
        /* harmony export */
      });
      /* harmony import */
      var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
      /* harmony import */
      var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
      /* harmony import */
      var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */
      var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
      /* harmony import */
      var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);


      var SubApp = function SubApp(props) {
        console.log('sub-app');
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
          console.log('useEffect', props);
        }, [props.id, props.name]);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, "sub-app ", props.name);
      };

      var config = {};

      var init = function init(params) {
        config.id = params.id || 'sub-app';
        config.name = params.name || 'sub-app 子应用';
        console.log('init:', config);
      };

      var forceInit = function forceInit(params) {
        Object.assign(config, params);
        console.log('forceInit:', config);
      };

      var render = function render(el, props) {
        console.log('render', el);
        if (typeof el === 'string') el = document.getElementById(el);
        react_dom__WEBPACK_IMPORTED_MODULE_2___default().render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SubApp, (0, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, config, props)), el);
      };

      var destroy = function destroy(el) {
        if (el) {
          react_dom__WEBPACK_IMPORTED_MODULE_2___default().unmountComponentAtNode(el);
          react_dom__WEBPACK_IMPORTED_MODULE_2___default().render(null, el);
        }
      };


      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = (SubApp);
    })();

    /******/
    return __webpack_exports__;
    /******/
  })()
    ;
});
