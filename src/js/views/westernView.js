import { elements } from './base.js';

export const renderGregorian = (gregorianDate) => {
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

export const renderJulian = (julianDate) => {
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