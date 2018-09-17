import * as convert from './models/Convert';
import * as view from './views/longcountView';
import { lcElements as elements } from './views/base';

/**
 * GLOBAL STATE OF THE APP
 * - current Maya Date
 * - current Correlation Constant
 * - current Gregorian Date
 * - current Julian Date
 */
const state = {};

const setupInitialDates = () => {
  state.gregDate = new Date();
  state.julianDate = convert.toJulian(state.gregDate);
  state.constant = 584286;
  state.mayaDate = convert.toMaya(state.gregDate, state.constant);
  state.mayaDate.calcTzolkin();
  state.mayaDate.calcHaab();
  state.mayaDate.calcLordOfNight();
};

// Initialize the app
setupInitialDates();
view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);

/**
 * GLYPH PANEL CONTROLLER
 */
elements.glyphPanel.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.dataset['action']) {
    changeLongCount(e.target.dataset['action'], e.target.dataset['index']);
    updateWesternDate();
    view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
  }
});

const changeLongCount = (action, index) => {
  const newLongCount = state.mayaDate.getLongCount().slice();
  if (action === 'increase' && index !== '3' && newLongCount[index] < 19) {
    newLongCount[index]++;
    } else if (action === 'increase' && index === '3' && newLongCount[index] < 17) {
      newLongCount[index]++;
    } else if (action === 'decrease' && newLongCount[index] > 0) {
    newLongCount[index]--;
  }
  state.mayaDate.setLongCount(newLongCount);
  state.mayaDate.calcTzolkin();
  state.mayaDate.calcHaab();
  state.mayaDate.calcLordOfNight();
};

const updateWesternDate = () => {
  state.constant = view.getConstInput();
  state.gregDate = convert.mayaToGreg(state.mayaDate, state.constant);
  state.julianDate = convert.toJulian(state.gregDate);
};

/**
 * MAYA FORM CONTROLLER
 */
elements.mayaForm.addEventListener('input', e => {
  e.preventDefault();
  changeMayaDate();
  updateWesternDate();
  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

const changeMayaDate = () => {
  const newLongCount = view.getMayaInput();
  state.mayaDate.setLongCount(newLongCount);
  state.mayaDate.calcTzolkin();
  state.mayaDate.calcHaab();
  state.mayaDate.calcLordOfNight();
};

/**
 * CORRELATION CONSTANT CONTROLLER
 */
elements.correlationForm.addEventListener('input', e => {
  updateWesternDate();
  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

elements.correlationForm.addEventListener('submit', e => e.preventDefault());

/**
 * GREGORIAN FORM CONTROLLER
 */
elements.gregorianForm.addEventListener('input', e => {
  changeGregorianDate();
  updateMayaDate();
  state.julianDate = convert.toJulian(state.gregDate);
  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

elements.gregorianForm.addEventListener('submit', e => e.preventDefault());

const changeGregorianDate = () => {
  const [newGregorianYear, newGregorianMonth, newGregorianDay] = view.getGregInput();
  state.gregDate.setFullYear(newGregorianYear);
  state.gregDate.setMonth(newGregorianMonth);
  state.gregDate.setDate(newGregorianDay);
};

const updateMayaDate = () => {
  state.constant = view.getConstInput();
  state.mayaDate = convert.toMaya(state.gregDate, state.constant);
  state.mayaDate.calcTzolkin();
  state.mayaDate.calcHaab();
  state.mayaDate.calcLordOfNight();
};

/**
 * JULIAN FORM CONTROLLER
 */
elements.julianForm.addEventListener('input', e => {
  changeJulianDate();
  state.gregDate = convert.julianToGreg(state.julianDate);
  updateMayaDate();
  view.updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

elements.julianForm.addEventListener('input', e => e.preventDefault());

const changeJulianDate = () => {
  const [newJulianYear, newJulianMonth, newJulianDay] = view.getJulianInput();
  state.julianDate.setFullYear(newJulianYear);
  state.julianDate.setMonth(newJulianMonth);
  state.julianDate.setDate(newJulianDay);
};