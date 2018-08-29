import MayaDate from './models/MayaDate';
import nextDate from './models/Distance';
import * as convert from './models/Convert';
import * as view from './views/dnumberView';
import { dnElements as elements } from './views/base';

/**
 * GLOBAL STATE OF THE APP
 * - Previous Maya Date
 * - Previous Western Date
 * - Distance Number
 * - Next Maya Date
 * - Next Western Date
 */
const state = {};

const setupInitialDates = () => {
  state.prevWesternDate = new Date();
  state.prevMayaDate = convert.toMaya(state.prevWesternDate, 584286);
  state.prevMayaDate.calculateTzolkin();
  state.prevMayaDate.calculateHaab();
  state.nextMayaDate = state.prevMayaDate;
};

// Initialize the app
setupInitialDates();
view.updateLCDisplay(state.prevMayaDate);
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
  state.prevMayaDate.calculateTzolkin();
  state.prevMayaDate.calculateHaab();
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
  view.addToList(state.prevMayaDate, operator, distanceNumber, state.nextMayaDate);
});