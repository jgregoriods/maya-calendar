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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/dnumber.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dnumber.js":
/*!***************************!*\
  !*** ./src/js/dnumber.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Distance = __webpack_require__(/*! ./models/Distance */ \"./src/js/models/Distance.js\");\n\nvar _Distance2 = _interopRequireDefault(_Distance);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\r\n * GLOBAL STATE OF THE APP\r\n * - Initial Maya Date\r\n * - Initial Western Date\r\n * - Distance Number\r\n * - Next Maya Date\r\n * - Next Western Date\r\n */\nvar state = {};\n\n//# sourceURL=webpack:///./src/js/dnumber.js?");

/***/ }),

/***/ "./src/js/models/Convert.js":
/*!**********************************!*\
  !*** ./src/js/models/Convert.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.julianToGreg = exports.toJulian = exports.toMaya = exports.mayaToGreg = exports.toVigesimal = exports.toDecimal = undefined;\n\nvar _MayaDate = __webpack_require__(/*! ./MayaDate */ \"./src/js/models/MayaDate.js\");\n\nvar _MayaDate2 = _interopRequireDefault(_MayaDate);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\r\n* Converts a vigesimal number in the Maya system to its decimal equivalent.\r\n* \r\n* @param {Array} vigesimalNumber The vigesimal Maya number to be converted. Must be an array of length 5.\r\n* @returns {number} A number in the decimal system.\r\n*/\nvar toDecimal = exports.toDecimal = function toDecimal(vigesimalNumber) {\n  var vigesimalPlaces = [144000, 7200, 360, 20, 1];\n  var decimalNumber = 0;\n\n  for (var i = 0; i < vigesimalPlaces.length; i++) {\n    decimalNumber += vigesimalNumber[i] * vigesimalPlaces[i];\n  }\n\n  return decimalNumber;\n};\n\n/**\r\n * Converts a decimal number to its equivalent in the Maya vigesimal system.\r\n * \r\n * @param {number} decimalNumber The number to be converted.\r\n * @returns {Array} A Maya vigesimal number as an array of length 5.\r\n */\nvar toVigesimal = exports.toVigesimal = function toVigesimal(decimalNumber) {\n  var vigesimalPlaces = [144000, 7200, 360, 20, 1];\n  var vigesimalNumber = [];\n\n  var remainder = decimalNumber;\n  for (var i = 0; i < vigesimalPlaces.length; i++) {\n    vigesimalNumber.push(Math.floor(remainder / vigesimalPlaces[i]));\n    remainder %= vigesimalPlaces[i];\n  }\n\n  return vigesimalNumber;\n};\n\n/**\r\n * Converts a Maya date to the Gregorian calendar.\r\n * \r\n * @param {Object} mayaDate The Maya date to be converted. Must be an object of class MayaDate.\r\n * @param {number} constant The correlation constant to perform the conversion.\r\n * @returns {Date} A date object.\r\n */\nvar mayaToGreg = exports.mayaToGreg = function mayaToGreg(mayaDate, constant) {\n  var daysFromJulianZero = toDecimal(mayaDate.getLongCount()) + constant;\n\n  // Initially set the Gregorian Date to Julian Day Number Zero\n  var gregorianDate = new Date(-4713, 10, 24);\n  gregorianDate.setDate(gregorianDate.getDate() + daysFromJulianZero);\n\n  return gregorianDate;\n};\n\n/**\r\n * Converts a Gregorian date to the Maya calendar.\r\n * \r\n * @param {Date} gregorianDate The date to be converted. Must be a Date object.\r\n * @param {number} constant The correlation constant to perform the conversion.\r\n * @returns {Object} An object of class MayaDate.\r\n */\nvar toMaya = exports.toMaya = function toMaya(gregorianDate, constant) {\n  var julianZero = new Date(-4713, 10, 24);\n  var daysFromJulianZero = Math.round((gregorianDate - julianZero) / 86400000);\n  var daysFromMayaZero = daysFromJulianZero - constant;\n\n  return new _MayaDate2.default(toVigesimal(daysFromMayaZero));\n};\n\n/**\r\n * Converts a Gregorian date to the Julian calendar.\r\n * \r\n * @param {Date} gregorianDate The date to be converted. Must be a Date object.\r\n * @returns {Date} A Date object representing a date in the Julian calendar.\r\n */\nvar toJulian = exports.toJulian = function toJulian(gregorianDate) {\n  // Last alignment between Gregorian and Julian calendars\n  var calendarBase = new Date(200, 2, 1);\n\n  var daysFromBase = (gregorianDate - calendarBase) / 86400000;\n  var centuriesFromBase = Math.floor(daysFromBase / 36524);\n  var extraLeapYears = Math.floor((centuriesFromBase + 2) / 4);\n  var daysToShift = centuriesFromBase - extraLeapYears;\n\n  var julianDate = new Date(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());\n  julianDate.setDate(gregorianDate.getDate() - daysToShift);\n\n  return julianDate;\n};\n\n/**\r\n * Converts a Julian date to the Gregorian calendar.\r\n * \r\n * @param {Date} julianDate The date to be converted. Must be a Date object.\r\n * @returns {Date} A Date object representing a date in the Gregorian calendar.\r\n */\nvar julianToGreg = exports.julianToGreg = function julianToGreg(julianDate) {\n  // Last alignment between Gregorian and Julian calendars\n  var calendarBase = new Date(200, 2, 1);\n\n  var daysFromBase = (julianDate - calendarBase) / 86400000;\n  var centuriesFromBase = Math.floor(daysFromBase / 36524);\n  var extraLeapYears = Math.floor((centuriesFromBase + 2) / 4);\n  var daysToShift = centuriesFromBase - extraLeapYears;\n\n  var gregorianDate = new Date(julianDate.getFullYear(), julianDate.getMonth(), julianDate.getDate());\n  gregorianDate.setDate(julianDate.getDate() + daysToShift);\n\n  return gregorianDate;\n};\n\n//# sourceURL=webpack:///./src/js/models/Convert.js?");

/***/ }),

/***/ "./src/js/models/Distance.js":
/*!***********************************!*\
  !*** ./src/js/models/Distance.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.nextDate = undefined;\n\nvar _MayaDate = __webpack_require__(/*! ./MayaDate */ \"./src/js/models/MayaDate.js\");\n\nvar _MayaDate2 = _interopRequireDefault(_MayaDate);\n\nvar _Convert = __webpack_require__(/*! ./Convert */ \"./src/js/models/Convert.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar nextDate = exports.nextDate = function nextDate(prevMayaDate, operator, distNumber) {\n  var numberOfDays = void 0;\n  if (operator === '+') {\n    numberOfDays = (0, _Convert.toDecimal)(prevMayaDate.getLongCount()) + (0, _Convert.toDecimal)(distNumber);\n  } else if (operator === '-') {\n    numberOfDays = (0, _Convert.toDecimal)(prevMayaDate.getLongCount()) - (0, _Convert.toDecimal)(distNumber);\n  }\n  var nextMayaDate = new _MayaDate2.default((0, _Convert.toVigesimal)(numberOfDays));\n  return nextMayaDate;\n};\n\n//# sourceURL=webpack:///./src/js/models/Distance.js?");

/***/ }),

/***/ "./src/js/models/MayaDate.js":
/*!***********************************!*\
  !*** ./src/js/models/MayaDate.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Convert = __webpack_require__(/*! ./Convert */ \"./src/js/models/Convert.js\");\n\nvar convert = _interopRequireWildcard(_Convert);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar tzolkinNames = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Edznab', 'Cauac', 'Ahau'];\n\nvar haabNames = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb'];\n\nvar MayaDate = function () {\n  function MayaDate(longCount) {\n    _classCallCheck(this, MayaDate);\n\n    this.longCount = longCount;\n  }\n\n  _createClass(MayaDate, [{\n    key: 'setLongCount',\n    value: function setLongCount(longCount) {\n      this.longCount = longCount;\n    }\n  }, {\n    key: 'getLongCount',\n    value: function getLongCount() {\n      return this.longCount;\n    }\n  }, {\n    key: 'calculateTzolkin',\n    value: function calculateTzolkin() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n\n      // An offset of 4 to account for the base date of 4 Ahau\n      var tzolkinNumber = (numberOfDays + 4) % 13;\n      if (tzolkinNumber === 0) tzolkinNumber = 13;\n\n      // An offset of 19 to account for the base date of 4 Ahau\n      var tzolkinName = tzolkinNames[(numberOfDays + 19) % 20];\n\n      this.tzolkin = [tzolkinNumber, tzolkinName];\n    }\n  }, {\n    key: 'getTzolkin',\n    value: function getTzolkin() {\n      return this.tzolkin;\n    }\n  }, {\n    key: 'calculateHaab',\n    value: function calculateHaab() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n\n      // An offset of 348 is due to the base date of 8 Cumku\n      var dayOfYear = (numberOfDays + 348) % 365;\n      var haabNumber = void 0;\n      var haabName = void 0;\n\n      if (dayOfYear < 361) {\n        haabNumber = dayOfYear % 20;\n        haabName = haabNames[Math.floor(dayOfYear / 20)];\n      } else {\n        haabNumber = dayOfYear - 360;\n        haabName = 'Uayeb';\n      }\n\n      this.haab = [haabNumber, haabName];\n    }\n  }, {\n    key: 'getHaab',\n    value: function getHaab() {\n      return this.haab;\n    }\n  }, {\n    key: 'calculateLordOfNight',\n    value: function calculateLordOfNight() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n      if (numberOfDays % 9 === 0) {\n        this.lordOfNight = 9;\n      } else {\n        this.lordOfNight = numberOfDays % 9;\n      }\n    }\n  }, {\n    key: 'getLordOfNight',\n    value: function getLordOfNight() {\n      return this.lordOfNight;\n    }\n  }]);\n\n  return MayaDate;\n}();\n\nexports.default = MayaDate;\n;\n\n//# sourceURL=webpack:///./src/js/models/MayaDate.js?");

/***/ })

/******/ });