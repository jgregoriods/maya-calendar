import { elements } from './base';

export const updateDisplay = (julianDate) => {
  let julianYear = julianDate.getFullYear();
  const julianEra = (julianYear > 0) ? 'CE' : 'BCE';
  if (julianEra === 'BCE') julianYear = -(julianYear - 1);
  const julianMonth = julianDate.getMonth();
  const julianDay = julianDate.getDate();

  elements.julianDay.value = julianDay;
  elements.julianMonth.value = julianMonth;
  elements.julianYear.value = julianYear;
  elements.julianEra.value = julianEra;
}

export const getInput = () => {
  let julianDay, julianYear;

  const julianEra = elements.julianEra.value;
  if (elements.julianYear.value) {
    julianYear = parseInt(elements.julianYear.value);
  } else {
    julianYear = 1;
  }
  if (julianEra === 'BCE') julianYear = -(julianYear - 1);
  const julianMonth = parseInt(elements.julianMonth.value);
  if (elements.julianDay.value) {
    julianDay = parseInt(elements.julianDay.value);
  } else {
    julianDay = 1;
  }

  return [julianYear, julianMonth, julianDay];
}