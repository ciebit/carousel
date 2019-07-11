/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/source/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/Carousel.ts":
/*!*************************!*\
  !*** ./app/Carousel.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Direction */ \"./app/Direction.ts\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Direction_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    var Carousel = /** @class */ (function () {\n        function Carousel(container) {\n            this.container = container;\n            this.direction = Direction_1.default.x;\n            this.elements = [];\n            this.focusItemClass = 'carousel__focus';\n            this.intervalId = 0;\n            this.interval = 2000;\n            this.sizeSkip = 300;\n        }\n        Carousel.prototype.addElement = function () {\n            var _a;\n            var element = [];\n            for (var _i = 0; _i < arguments.length; _i++) {\n                element[_i] = arguments[_i];\n            }\n            (_a = this.elements).push.apply(_a, element);\n            return this;\n        };\n        Carousel.prototype.autoMove = function (active) {\n            if (active) {\n                this.autoMoveStart();\n                return this;\n            }\n            this.autoMoveStop();\n            return this;\n        };\n        Carousel.prototype.autoMoveStart = function () {\n            var _this = this;\n            this.intervalId = window.setInterval(function () { return _this.scroll(); }, this.interval);\n            return this;\n        };\n        Carousel.prototype.autoMoveStop = function () {\n            window.clearInterval(this.intervalId);\n            this.intervalId = 0;\n            return this;\n        };\n        Carousel.prototype.autoMoveToggle = function () {\n            this.autoMove(!this.isAutoMove());\n            return this;\n        };\n        Carousel.prototype.isAutoMove = function () {\n            return this.intervalId > 0;\n        };\n        Carousel.prototype.moveNext = function () {\n            var index = this.elements.indexOf(this.focusItemElement) + 1;\n            if (this.elements.length == 0\n                || index >= this.elements.length) {\n                return this;\n            }\n            this.moveTo(this.elements[index]);\n            return this;\n        };\n        Carousel.prototype.movePrevious = function () {\n            var index = this.elements.indexOf(this.focusItemElement) - 1;\n            if (this.elements.length == 0\n                || index < 0) {\n                return this;\n            }\n            this.moveTo(this.elements[index]);\n            return this;\n        };\n        Carousel.prototype.moveTo = function (element) {\n            var index = this.elements.indexOf(element);\n            if (index < 0) {\n                return this;\n            }\n            if (this.focusItemElement && this.focusItemClass) {\n                this.focusItemElement.classList.remove(this.focusItemClass);\n            }\n            this.focusItemElement = element;\n            var options = {\n                behavior: \"smooth\",\n                block: \"nearest\",\n                inline: \"center\"\n            };\n            if (this.direction == Direction_1.default.y) {\n                options.block = \"center\";\n                options.inline = \"nearest\";\n            }\n            element.scrollIntoView(options);\n            if (this.focusItemClass.length > 0) {\n                element.classList.add(this.focusItemClass);\n            }\n            return this;\n        };\n        Carousel.prototype.scroll = function () {\n            var direction = 'top';\n            var actualPosition = this.container.scrollTop;\n            var sizeScroll = this.container.scrollHeight;\n            var contentSize = this.container.clientHeight;\n            if (this.direction == Direction_1.default.x) {\n                direction = 'left';\n                actualPosition = this.container.scrollLeft;\n                sizeScroll = this.container.scrollWidth;\n                contentSize = this.container.clientWidth;\n            }\n            var skip = actualPosition + this.sizeSkip;\n            if (sizeScroll - actualPosition === contentSize) {\n                skip = 0;\n            }\n            var options = {\n                'behavior': 'smooth'\n            };\n            options[direction] = skip;\n            this.container.scroll(options);\n            return this;\n        };\n        Carousel.prototype.setClassItemInFocus = function (className) {\n            this.focusItemClass = className;\n            return this;\n        };\n        Carousel.prototype.setElements = function (elements) {\n            this.elements = elements;\n            return this;\n        };\n        return Carousel;\n    }());\n    exports.default = Carousel;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./app/Carousel.ts?");

/***/ }),

/***/ "./app/Direction.ts":
/*!**************************!*\
  !*** ./app/Direction.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    var Direction;\n    (function (Direction) {\n        Direction[Direction[\"x\"] = 0] = \"x\";\n        Direction[Direction[\"y\"] = 1] = \"y\";\n    })(Direction || (Direction = {}));\n    exports.default = Direction;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./app/Direction.ts?");

/***/ }),

/***/ "./example/source/index.ts":
/*!*********************************!*\
  !*** ./example/source/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../../index */ \"./index.ts\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, index_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    document.addEventListener('DOMContentLoaded', function () {\n        carouselAuto(document);\n        carouselManualHorizontal(document);\n    });\n    function carouselAuto(document) {\n        var container = document.querySelector('.carouselAuto');\n        var items = document.querySelectorAll('.carouselAuto__item');\n        var buttonStartStop = document.querySelector('.carouselAuto__buttonStartOrStop');\n        var carousel = new index_1.Carousel(container);\n        carousel.addElement.apply(carousel, Array.prototype.slice.call(items));\n        carousel.autoMove(true);\n        buttonStartStop.addEventListener('click', carousel.autoMoveToggle.bind(carousel));\n    }\n    function carouselManualHorizontal(document) {\n        var container = document.querySelector('.carouselManualHorizontal');\n        var items = document.querySelectorAll('.carouselManualHorizontal__item');\n        var buttonNext = document.querySelector('.carouselManualHorizontal__buttonNext');\n        var buttonPrevious = document.querySelector('.carouselManualHorizontal__buttonPrevious');\n        var carousel = new index_1.Carousel(container);\n        carousel.addElement.apply(carousel, Array.prototype.slice.call(items));\n        buttonNext.addEventListener('click', carousel.moveNext.bind(carousel));\n        buttonPrevious.addEventListener('click', carousel.movePrevious.bind(carousel));\n    }\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./example/source/index.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./app/Carousel */ \"./app/Carousel.ts\"), __webpack_require__(/*! ./app/Direction */ \"./app/Direction.ts\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Carousel_1, Direction_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.Carousel = Carousel_1.default;\n    exports.Direction = Direction_1.default;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });