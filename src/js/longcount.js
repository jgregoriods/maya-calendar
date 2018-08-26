import MayaDate from './models/MayaDate.js';
import * as convert from './models/Convert.js';
import * as mayaView from './views/mayaView.js';
import * as gregorianView from './views/gregorianView.js';
import * as julianView from './views/julianView.js';
import * as constantView from './views/constantView.js';
import { elements } from './views/base.js';

const controller = (function() {

  /**
  * GLOBAL STATE OF THE APP
  * - current Maya Date
  * - current Correlation Constant
  * - current Gregorian Date
  * - current Julian Date
  */
  const state = {};

  function setupCurrentDates() {
    state.gregDate = new Date();
    state.julianDate = convert.toJulian(state.gregDate);
    state.constant = 584286;
    state.mayaDate = convert.toMaya(state.gregDate, state.constant);
    state.mayaDate.setTzolkin();
    state.mayaDate.setHaab();
    state.mayaDate.setLordOfNight();
  };

  function setupEventListeners() {
    elements.glyphPanel.addEventListener('click', e => {
      if (e.target.dataset['action']) {
        changeLongCount(e.target.dataset['action'], e.target.dataset['index']);

        ctrlUpdateGregFromMaya(); //
        ctrlUpdateJulianDate(); //

        updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
      }
    });

    elements.mayaForm.addEventListener('input', e => {
      changeMayaDate();

      ctrlUpdateGregFromMaya(); //
      ctrlUpdateJulianDate(); //

      updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
    });

    elements.correlationForm.addEventListener('input', e => {

      ctrlUpdateGregFromMaya(); //
      ctrlUpdateJulianDate(); //

      updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
    });

    elements.gregorianForm.addEventListener('input', e => {
      changeGregorianDate();
      ctrlUpdateMayaDate();
      ctrlUpdateJulianDate();

      updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
    });

    elements.julianForm.addEventListener('input', e => {
      changeJulianDate();
      
      state.gregDate = convert.julianToGreg(state.julianDate);

      ctrlUpdateMayaDate();

      updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
    });
  };

  const changeLongCount = (action, index) => {
    const newLongCount = state.mayaDate.getLongCount().slice();
    if (action === 'increase' && index !== '3' && newLongCount[index] < 19) {
      newLongCount[index]++;
      } else if (action === 'increase' && index === '3' && newLongCount[index] < 17) {
        newLongCount[index]++;
      } else if (action === 'decrease' && newLongCount[index] > 0) {
      newLongCount[index]--;
    }
    state.mayaDate = new MayaDate(newLongCount);
    state.mayaDate.setTzolkin();
    state.mayaDate.setHaab();
    state.mayaDate.setLordOfNight();
  };

  const changeMayaDate = () => {
    const newLongCount = mayaView.getInput();
    state.mayaDate = new MayaDate(newLongCount);
    state.mayaDate.setTzolkin();
    state.mayaDate.setHaab();
    state.mayaDate.setLordOfNight();
  };

  const changeGregorianDate = () => {
    const [newGregorianYear, newGregorianMonth, newGregorianDay] = gregorianView.getInput();
    state.gregDate.setFullYear(newGregorianYear);
    state.gregDate.setMonth(newGregorianMonth);
    state.gregDate.setDate(newGregorianDay);
  };

  const changeJulianDate = () => {
    const [newJulianYear, newJulianMonth, newJulianDay] = julianView.getInput();
    state.julianDate.setFullYear(newJulianYear);
    state.julianDate.setMonth(newJulianMonth);
    state.julianDate.setDate(newJulianDay);
  };

  function ctrlUpdateGregFromMaya() {
    state.constant = constantView.getInput();
    state.gregDate = convert.mayaToGreg(state.mayaDate, state.constant);
  };

  function ctrlUpdateJulianDate() {
    state.julianDate = convert.toJulian(state.gregDate);
  }

  function ctrlUpdateMayaDate() {
    state.constant = constantView.getInput();
    state.mayaDate = convert.toMaya(state.gregDate, state.constant);
    state.mayaDate.setTzolkin();
    state.mayaDate.setHaab();
    state.mayaDate.setLordOfNight();
  };

  const updateAllDisplays = (mayaDate, gregorianDate, julianDate) => {
    mayaView.updateDisplay(mayaDate);
    gregorianView.updateDisplay(gregorianDate);
    julianView.updateDisplay(julianDate);
  }

  return {
    init: function() {
      setupCurrentDates();
      updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
      setupEventListeners();
    }
  }
})();

controller.init();