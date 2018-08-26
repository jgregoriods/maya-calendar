import { elements } from './base';

export const updateDisplay = (gregorianDate) => {
  let gregorianYear = gregorianDate.getFullYear();
  const gregorianEra = (gregorianYear > 0) ? 'CE' : 'BCE';
  if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);
  const gregorianMonth = gregorianDate.getMonth();
  const gregorianDay = gregorianDate.getDate();

  elements.gregorianDay.value = gregorianDay;
  elements.gregorianMonth.value = gregorianMonth;
  elements.gregorianYear.value = gregorianYear;
  elements.gregorianEra.value = gregorianEra;
}

export const getInput = () => {
  let gregorianDay, gregorianYear;

  const gregorianEra = elements.gregorianEra.value;
  if (elements.gregorianYear.value) {
    gregorianYear = parseInt(elements.gregorianYear.value);
  } else {
    gregorianYear = 1;
  }
  if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);
  const gregorianMonth = parseInt(elements.gregorianMonth.value);
  if (elements.gregorianDay.value) {
    gregorianDay = parseInt(elements.gregorianDay.value);
  } else {
    gregorianDay = 1;
  }

  return [gregorianYear, gregorianMonth, gregorianDay];
}