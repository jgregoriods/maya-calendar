import * as convert from './models/Convert';
import * as mayaView from './views/mayaView';
import * as gregorianView from './views/gregorianView';
import * as julianView from './views/julianView';
import * as constantView from './views/constantView';
import { elements } from './views/base';

/**
 * GLOBAL STATE OF THE APP
 * - current Maya Date
 * - current Correlation Constant
 * - current Gregorian Date
 * - current Julian Date
 */
const state = {};

const setupCurrentDates = () => {
  state.gregDate = new Date();
  state.julianDate = convert.toJulian(state.gregDate);
  state.constant = 584286;
  state.mayaDate = convert.toMaya(state.gregDate, state.constant);
  state.mayaDate.calculateTzolkin();
  state.mayaDate.calculateHaab();
  state.mayaDate.calculateLordOfNight();
};

const updateAllDisplays = (mayaDate, gregorianDate, julianDate) => {
  mayaView.updateDisplay(mayaDate);
  gregorianView.updateDisplay(gregorianDate);
  julianView.updateDisplay(julianDate);
};

// Initialize the app
setupCurrentDates();
updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);

/**
 * Glyph Panel Controller
 */
elements.glyphPanel.addEventListener('click', e => {
  if (e.target.dataset['action']) {
    changeLongCount(e.target.dataset['action'], e.target.dataset['index']);
    updateWesternDate();
    updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
  }
});

/**
 * Maya Date Controller
 */
elements.mayaForm.addEventListener('input', e => {
  changeMayaDate();
  updateWesternDate();
  updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

/**
 * Correlation Constant Controller
 */
elements.correlationForm.addEventListener('input', e => {
  updateWesternDate();
  updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

/**
 * Gregorian Date Controller
 */
elements.gregorianForm.addEventListener('input', e => {
  changeGregorianDate();
  updateMayaDate();
  state.julianDate = convert.toJulian(state.gregDate);
  updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
});

/**
 * Julian Date Controller
 */
elements.julianForm.addEventListener('input', e => {
  changeJulianDate();
  state.gregDate = convert.julianToGreg(state.julianDate);
  updateMayaDate();
  updateAllDisplays(state.mayaDate, state.gregDate, state.julianDate);
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
  state.mayaDate.calculateTzolkin();
  state.mayaDate.calculateHaab();
  state.mayaDate.calculateLordOfNight();
};

const changeMayaDate = () => {
  const newLongCount = mayaView.getInput();
  state.mayaDate.setLongCount(newLongCount);
  state.mayaDate.calculateTzolkin();
  state.mayaDate.calculateHaab();
  state.mayaDate.calculateLordOfNight();
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

const updateMayaDate = () => {
  state.constant = constantView.getInput();
  state.mayaDate = convert.toMaya(state.gregDate, state.constant);
  state.mayaDate.calculateTzolkin();
  state.mayaDate.calculateHaab();
  state.mayaDate.calculateLordOfNight();
};

const updateWesternDate = () => {
  state.constant = constantView.getInput();
  state.gregDate = convert.mayaToGreg(state.mayaDate, state.constant);
  state.julianDate = convert.toJulian(state.gregDate);
};