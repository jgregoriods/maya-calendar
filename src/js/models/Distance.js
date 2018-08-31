import MayaDate from './MayaDate';
import { toDecimal, toVigesimal } from './Convert';

/**
 * Calculates the next date in the Maya Calendar given a distance number back or forward.
 * @param {Object} prevMayaDate The starting date. Must be an object of class MayaDate.
 * @param {string} operator Indicates whether the next date is counted back or forward.
 * @param {Array} distNumber The distance number between the dates. Must be an array of length 5 representing a Maya vigesimal number.
 * @returns {Object} An object of class MayaDate.
 */
const nextDate = (prevMayaDate, operator, distNumber) => {
  let numberOfDays;
  if (operator === '+') {
    numberOfDays = toDecimal(prevMayaDate.getLongCount()) + toDecimal(distNumber);
  } else if (operator === '-') {
    numberOfDays = toDecimal(prevMayaDate.getLongCount()) - toDecimal(distNumber);
  }
  const nextMayaDate = new MayaDate(toVigesimal(numberOfDays));
  nextMayaDate.calcTzolkin();
  nextMayaDate.calcHaab();
  return nextMayaDate;
};

export { nextDate as default };