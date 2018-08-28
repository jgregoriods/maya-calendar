import MayaDate from './MayaDate';
import { toDecimal, toVigesimal } from './Convert';

const nextDate = (prevMayaDate, operator, distNumber) => {
  let numberOfDays;
  if (operator === '+') {
    numberOfDays = toDecimal(prevMayaDate.getLongCount()) + toDecimal(distNumber);
  } else if (operator === '-') {
    numberOfDays = toDecimal(prevMayaDate.getLongCount()) - toDecimal(distNumber);
  }
  const nextMayaDate = new MayaDate(toVigesimal(numberOfDays));
  nextMayaDate.calculateTzolkin();
  nextMayaDate.calculateHaab();
  return nextMayaDate;
};

export { nextDate as default };