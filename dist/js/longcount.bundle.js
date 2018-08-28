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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/longcount.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/longcount.js":
/*!*****************************!*\
  !*** ./src/js/longcount.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _Convert = __webpack_require__(/*! ./models/Convert */ \"./src/js/models/Convert.js\");\n\nvar convert = _interopRequireWildcard(_Convert);\n\nvar _longcountView = __webpack_require__(/*! ./views/longcountView */ \"./src/js/views/longcountView.js\");\n\nvar view = _interopRequireWildcard(_longcountView);\n\nvar _base = __webpack_require__(/*! ./views/base */ \"./src/js/views/base.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n/**\r\n * GLOBAL STATE OF THE APP\r\n * - current Maya Date\r\n * - current Correlation Constant\r\n * - current Gregorian Date\r\n * - current Julian Date\r\n */\nvar state = {};\n\nvar setupInitialDates = function setupInitialDates() {\n  state.gregDate = new Date();\n  state.julianDate = convert.toJulian(state.gregDate);\n  state.constant = 584286;\n  state.mayaDate = convert.toMaya(state.gregDate, state.constant);\n  state.mayaDate.calculateTzolkin();\n  state.mayaDate.calculateHaab();\n  state.mayaDate.calculateLordOfNight();\n};\n\n// Initialize the app\nsetupInitialDates();\nview.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n\n/**\r\n * GLYPH PANEL CONTROLLER\r\n */\n_base.elements.glyphPanel.addEventListener('click', function (e) {\n  if (e.target.dataset['action']) {\n    changeLongCount(e.target.dataset['action'], e.target.dataset['index']);\n    updateWesternDate();\n    view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n  }\n});\n\nvar changeLongCount = function changeLongCount(action, index) {\n  var newLongCount = state.mayaDate.getLongCount().slice();\n  if (action === 'increase' && index !== '3' && newLongCount[index] < 19) {\n    newLongCount[index]++;\n  } else if (action === 'increase' && index === '3' && newLongCount[index] < 17) {\n    newLongCount[index]++;\n  } else if (action === 'decrease' && newLongCount[index] > 0) {\n    newLongCount[index]--;\n  }\n  state.mayaDate.setLongCount(newLongCount);\n  state.mayaDate.calculateTzolkin();\n  state.mayaDate.calculateHaab();\n  state.mayaDate.calculateLordOfNight();\n};\n\nvar updateWesternDate = function updateWesternDate() {\n  state.constant = view.getConstInput();\n  state.gregDate = convert.mayaToGreg(state.mayaDate, state.constant);\n  state.julianDate = convert.toJulian(state.gregDate);\n};\n\n/**\r\n * MAYA FORM CONTROLLER\r\n */\n_base.elements.mayaForm.addEventListener('input', function (e) {\n  changeMayaDate();\n  updateWesternDate();\n  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n});\n\nvar changeMayaDate = function changeMayaDate() {\n  var newLongCount = view.getMayaInput();\n  state.mayaDate.setLongCount(newLongCount);\n  state.mayaDate.calculateTzolkin();\n  state.mayaDate.calculateHaab();\n  state.mayaDate.calculateLordOfNight();\n};\n\n/**\r\n * CORRELATION CONSTANT CONTROLLER\r\n */\n_base.elements.correlationForm.addEventListener('input', function (e) {\n  updateWesternDate();\n  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n});\n\n/**\r\n * GREGORIAN FORM CONTROLLER\r\n */\n_base.elements.gregorianForm.addEventListener('input', function (e) {\n  changeGregorianDate();\n  updateMayaDate();\n  state.julianDate = convert.toJulian(state.gregDate);\n  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n});\n\nvar changeGregorianDate = function changeGregorianDate() {\n  var _view$getGregInput = view.getGregInput(),\n      _view$getGregInput2 = _slicedToArray(_view$getGregInput, 3),\n      newGregorianYear = _view$getGregInput2[0],\n      newGregorianMonth = _view$getGregInput2[1],\n      newGregorianDay = _view$getGregInput2[2];\n\n  state.gregDate.setFullYear(newGregorianYear);\n  state.gregDate.setMonth(newGregorianMonth);\n  state.gregDate.setDate(newGregorianDay);\n};\n\nvar updateMayaDate = function updateMayaDate() {\n  state.constant = view.getConstInput();\n  state.mayaDate = convert.toMaya(state.gregDate, state.constant);\n  state.mayaDate.calculateTzolkin();\n  state.mayaDate.calculateHaab();\n  state.mayaDate.calculateLordOfNight();\n};\n\n/**\r\n * JULIAN FORM CONTROLLER\r\n */\n_base.elements.julianForm.addEventListener('input', function (e) {\n  changeJulianDate();\n  state.gregDate = convert.julianToGreg(state.julianDate);\n  updateMayaDate();\n  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);\n});\n\nvar changeJulianDate = function changeJulianDate() {\n  var _view$getJulianInput = view.getJulianInput(),\n      _view$getJulianInput2 = _slicedToArray(_view$getJulianInput, 3),\n      newJulianYear = _view$getJulianInput2[0],\n      newJulianMonth = _view$getJulianInput2[1],\n      newJulianDay = _view$getJulianInput2[2];\n\n  state.julianDate.setFullYear(newJulianYear);\n  state.julianDate.setMonth(newJulianMonth);\n  state.julianDate.setDate(newJulianDay);\n};\n\n//# sourceURL=webpack:///./src/js/longcount.js?");

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

/***/ "./src/js/models/MayaDate.js":
/*!***********************************!*\
  !*** ./src/js/models/MayaDate.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Convert = __webpack_require__(/*! ./Convert */ \"./src/js/models/Convert.js\");\n\nvar convert = _interopRequireWildcard(_Convert);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar tzolkinNames = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Edznab', 'Cauac', 'Ahau'];\n\nvar haabNames = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb'];\n\nvar MayaDate = function () {\n  function MayaDate(longCount) {\n    _classCallCheck(this, MayaDate);\n\n    this.longCount = longCount;\n  }\n\n  _createClass(MayaDate, [{\n    key: 'setLongCount',\n    value: function setLongCount(longCount) {\n      this.longCount = longCount;\n    }\n  }, {\n    key: 'getLongCount',\n    value: function getLongCount() {\n      return this.longCount;\n    }\n  }, {\n    key: 'calculateTzolkin',\n    value: function calculateTzolkin() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n\n      // An offset of 4 to account for the base date of 4 Ahau\n      var tzolkinNumber = (numberOfDays + 4) % 13;\n      if (tzolkinNumber === 0) tzolkinNumber = 13;\n\n      // An offset of 19 to account for the base date of 4 Ahau\n      var tzolkinName = tzolkinNames[(numberOfDays + 19) % 20];\n\n      this.tzolkin = [tzolkinNumber, tzolkinName];\n    }\n  }, {\n    key: 'getTzolkin',\n    value: function getTzolkin() {\n      return this.tzolkin;\n    }\n  }, {\n    key: 'calculateHaab',\n    value: function calculateHaab() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n\n      // An offset of 348 is due to the base date of 8 Cumku\n      var dayOfYear = (numberOfDays + 348) % 365;\n      var haabNumber = void 0;\n      var haabName = void 0;\n\n      if (dayOfYear < 361) {\n        haabNumber = dayOfYear % 20;\n        haabName = haabNames[Math.floor(dayOfYear / 20)];\n      } else {\n        haabNumber = dayOfYear - 360;\n        haabName = 'Uayeb';\n      }\n\n      this.haab = [haabNumber, haabName];\n    }\n  }, {\n    key: 'getHaab',\n    value: function getHaab() {\n      return this.haab;\n    }\n  }, {\n    key: 'calculateLordOfNight',\n    value: function calculateLordOfNight() {\n      var numberOfDays = convert.toDecimal(this.longCount);\n      if (numberOfDays % 9 === 0) {\n        this.lordOfNight = 9;\n      } else {\n        this.lordOfNight = numberOfDays % 9;\n      }\n    }\n  }, {\n    key: 'getLordOfNight',\n    value: function getLordOfNight() {\n      return this.lordOfNight;\n    }\n  }]);\n\n  return MayaDate;\n}();\n\nexports.default = MayaDate;\n;\n\n//# sourceURL=webpack:///./src/js/models/MayaDate.js?");

/***/ }),

/***/ "./src/js/views/base.js":
/*!******************************!*\
  !*** ./src/js/views/base.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar elements = exports.elements = {\n  glyphPanel: document.querySelector('.glyph-panel'),\n  mayaForm: document.getElementById('maya-form'),\n  correlationForm: document.getElementById('corr-form'),\n  gregorianForm: document.getElementById('greg-form'),\n  julianForm: document.getElementById('jul-form'),\n\n  longCountInput: document.querySelectorAll('.lc-index'),\n\n  longCount: {\n    0: document.getElementById('lc-0'),\n    1: document.getElementById('lc-1'),\n    2: document.getElementById('lc-2'),\n    3: document.getElementById('lc-3'),\n    4: document.getElementById('lc-4')\n  },\n  lcGlyphs: {\n    0: document.getElementById('lc-0-coef'),\n    1: document.getElementById('lc-1-coef'),\n    2: document.getElementById('lc-2-coef'),\n    3: document.getElementById('lc-3-coef'),\n    4: document.getElementById('lc-4-coef')\n  },\n\n  calendarRound: document.getElementById('calendar-round'),\n  tzolkinCoef: document.getElementById('tzolkin-coef'),\n  tzolkinName: document.getElementById('tzolkin-name'),\n  glyphG: document.getElementById('glyph-G'),\n  haabCoef: document.getElementById('haab-coef'),\n  haabName: document.getElementById('haab-name'),\n\n  constant: document.getElementById('constant'),\n\n  gregorianDay: document.getElementById('greg-day'),\n  gregorianMonth: document.getElementById('greg-month'),\n  gregorianYear: document.getElementById('greg-year'),\n  gregorianEra: document.getElementById('greg-era'),\n\n  julianDay: document.getElementById('jul-day'),\n  julianMonth: document.getElementById('jul-month'),\n  julianYear: document.getElementById('jul-year'),\n  julianEra: document.getElementById('jul-era')\n};\n\n//# sourceURL=webpack:///./src/js/views/base.js?");

/***/ }),

/***/ "./src/js/views/longcountView.js":
/*!***************************************!*\
  !*** ./src/js/views/longcountView.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.updateAllDisplays = exports.getJulianInput = exports.getGregInput = exports.getConstInput = exports.getMayaInput = undefined;\n\nvar _base = __webpack_require__(/*! ./base */ \"./src/js/views/base.js\");\n\nvar getMayaInput = exports.getMayaInput = function getMayaInput() {\n  var longCountArray = [];\n  _base.elements.longCountInput.forEach(function (input) {\n    if (input.value) longCountArray.push(parseInt(input.value));else longCountArray.push(0);\n  });\n\n  return longCountArray;\n};\n\nvar getConstInput = exports.getConstInput = function getConstInput() {\n  if (_base.elements.constant.value) return parseInt(_base.elements.constant.value);else return 0;\n};\n\nvar getGregInput = exports.getGregInput = function getGregInput() {\n  var gregorianDay = void 0,\n      gregorianYear = void 0;\n\n  var gregorianEra = _base.elements.gregorianEra.value;\n  if (_base.elements.gregorianYear.value) {\n    gregorianYear = parseInt(_base.elements.gregorianYear.value);\n  } else {\n    gregorianYear = 1;\n  }\n  if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);\n  var gregorianMonth = parseInt(_base.elements.gregorianMonth.value);\n  if (_base.elements.gregorianDay.value) {\n    gregorianDay = parseInt(_base.elements.gregorianDay.value);\n  } else {\n    gregorianDay = 1;\n  }\n\n  return [gregorianYear, gregorianMonth, gregorianDay];\n};\n\nvar getJulianInput = exports.getJulianInput = function getJulianInput() {\n  var julianDay = void 0,\n      julianYear = void 0;\n\n  var julianEra = _base.elements.julianEra.value;\n  if (_base.elements.julianYear.value) {\n    julianYear = parseInt(_base.elements.julianYear.value);\n  } else {\n    julianYear = 1;\n  }\n  if (julianEra === 'BCE') julianYear = -(julianYear - 1);\n  var julianMonth = parseInt(_base.elements.julianMonth.value);\n  if (_base.elements.julianDay.value) {\n    julianDay = parseInt(_base.elements.julianDay.value);\n  } else {\n    julianDay = 1;\n  }\n\n  return [julianYear, julianMonth, julianDay];\n};\n\nvar updateMayaDisplay = function updateMayaDisplay(mayaDate) {\n  var longCount = mayaDate.getLongCount();\n  var tzolkin = mayaDate.getTzolkin();\n  var haab = mayaDate.getHaab();\n  var lordOfNight = mayaDate.getLordOfNight();\n\n  for (var i = 0; i < 5; i++) {\n    _base.elements.longCount[i].value = longCount[i];\n    _base.elements.lcGlyphs[i].src = 'img/number-' + longCount[i] + '.png';\n  }\n  _base.elements.calendarRound.innerHTML = tzolkin.join(' ') + ' ' + haab.join(' ');\n  _base.elements.tzolkinCoef.src = 'img/number-' + tzolkin[0] + '.png';\n  _base.elements.tzolkinName.src = 'img/' + tzolkin[1] + '.png';\n  _base.elements.glyphG.src = 'img/G' + lordOfNight + '.png';\n  if (haab[0] === 0) {\n    _base.elements.haabCoef.src = 'img/chum.png';\n  } else {\n    _base.elements.haabCoef.src = 'img/number-' + haab[0] + '.png';\n  }\n  _base.elements.haabName.src = 'img/' + haab[1] + '.png';\n};\n\nvar updateGregDisplay = function updateGregDisplay(gregorianDate) {\n  var gregorianYear = gregorianDate.getFullYear();\n  var gregorianEra = gregorianYear > 0 ? 'CE' : 'BCE';\n  if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);\n  var gregorianMonth = gregorianDate.getMonth();\n  var gregorianDay = gregorianDate.getDate();\n\n  _base.elements.gregorianDay.value = gregorianDay;\n  _base.elements.gregorianMonth.value = gregorianMonth;\n  _base.elements.gregorianYear.value = gregorianYear;\n  _base.elements.gregorianEra.value = gregorianEra;\n};\n\nvar updateJulianDisplay = function updateJulianDisplay(julianDate) {\n  var julianYear = julianDate.getFullYear();\n  var julianEra = julianYear > 0 ? 'CE' : 'BCE';\n  if (julianEra === 'BCE') julianYear = -(julianYear - 1);\n  var julianMonth = julianDate.getMonth();\n  var julianDay = julianDate.getDate();\n\n  _base.elements.julianDay.value = julianDay;\n  _base.elements.julianMonth.value = julianMonth;\n  _base.elements.julianYear.value = julianYear;\n  _base.elements.julianEra.value = julianEra;\n};\n\nvar updateAllDisplays = exports.updateAllDisplays = function updateAllDisplays(mayaDate, gregorianDate, julianDate) {\n  updateMayaDisplay(mayaDate);\n  updateGregDisplay(gregorianDate);\n  updateJulianDisplay(julianDate);\n};\n\n//# sourceURL=webpack:///./src/js/views/longcountView.js?");

/***/ })

/******/ });