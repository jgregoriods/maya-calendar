import nextDate from './models/Distance';
import * as convert from './models/Convert';
import * as view from './views/dnumberView';
import { dnElements as elements } from './views/base';

/**
 * GLOBAL STATE OF THE APP
 * - Previous Maya Date
 * - Previous Western Date
 * - Next Maya Date
 * - Next Western Date
 */
const state = {};

const setupInitialDates = () => {
  state.prevWesternDate = new Date();
  state.prevMayaDate = convert.toMaya(state.prevWesternDate, 584286);
  state.prevMayaDate.calcTzolkin();
  state.prevMayaDate.calcHaab();
  state.nextMayaDate = state.prevMayaDate;
};

// Initialize the app
setupInitialDates();
view.resetFormDisplay(state.prevMayaDate);
view.updateGlyphDisplay(state.prevMayaDate, '+', [0, 0, 0, 0, 0], state.nextMayaDate);

/**
 * LONGCOUNT CONTROLLER
 */
elements.longCountForm.addEventListener('input', e => {
  const [operator, distanceNumber] = view.getDistNumberInput();
  changePrevDate();
  changeNextDate();
  view.updateGlyphDisplay(state.prevMayaDate, operator, distanceNumber, state.nextMayaDate);
});

const changePrevDate = () => {
  const newLongCount = view.getLongCountInput();
  state.prevMayaDate.setLongCount(newLongCount);
  state.prevMayaDate.calcTzolkin();
  state.prevMayaDate.calcHaab();
};

const changeNextDate = () => {
  const prevMayaDate = state.prevMayaDate;
  const [operator, distanceNumber] = view.getDistNumberInput();
  state.nextMayaDate = nextDate(prevMayaDate, operator, distanceNumber);
};

/**
 * DISTANCE NUMBER CONTROLLER
 */
elements.distNumberForm.addEventListener('input', e => {
  const [operator, distanceNumber] = view.getDistNumberInput();
  changeNextDate();
  view.updateGlyphDisplay(state.prevMayaDate, operator, distanceNumber, state.nextMayaDate);
});

/**
 * GLYPH PANEL CONTROLLER
 */
elements.addButton.addEventListener('click', e => {
  const [operator, distanceNumber] = view.getDistNumberInput();
  changeWesternDates();
  view.addToList(state.prevMayaDate, state.prevWesternDate, operator, distanceNumber, state.nextMayaDate, state.nextWesternDate);
  resetDates();
});

const changeWesternDates = () => {
  const prevGreg = convert.mayaToGreg(state.prevMayaDate, 584286);
  const nextGreg = convert.mayaToGreg(state.nextMayaDate, 584286);
  state.prevWesternDate = convert.toJulian(prevGreg);
  state.nextWesternDate = convert.toJulian(nextGreg);
};

const resetDates = () => {
  state.prevMayaDate = state.nextMayaDate;
  view.resetFormDisplay(state.prevMayaDate);
  const [operator, distanceNumber] = view.getDistNumberInput();
  view.updateGlyphDisplay(state.prevMayaDate, operator, distanceNumber, state.nextMayaDate);
};

/**
 * DATE LIST CONTROLLER
 */
elements.dateList.addEventListener('click', e => {
  if (e.target.className === 'delete-btn') {
    const item = e.target.closest('.date-item');
    view.deleteFromList(item);
  }
});