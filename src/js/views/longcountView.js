import { elements } from './base';

export const getMayaInput = () => {
  const longCountArray = [];
  elements.longCountInput.forEach(input => {
    if (input.value) longCountArray.push(parseInt(input.value));
    else longCountArray.push(0);
  });

  return longCountArray;
};

export const getConstInput = () => {
  if (elements.constant.value) return parseInt(elements.constant.value);
  else return 0;
};

export const getGregInput = () => {
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
};

export const getJulianInput = () => {
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
};

const updateMayaDisplay = (mayaDate) => {
  const longCount = mayaDate.getLongCount();
  const tzolkin = mayaDate.getTzolkin();
  const haab = mayaDate.getHaab();
  const lordOfNight = mayaDate.getLordOfNight();

  for (let i = 0; i < 5; i++) {
    elements.longCount[i].value = longCount[i];
    elements.lcGlyphs[i].src = `img/number-${longCount[i]}.png`;
  }
  elements.calendarRound.innerHTML = `${tzolkin.join(' ')} ${haab.join(' ')}`;
  elements.tzolkinCoef.src = `img/number-${tzolkin[0]}.png`;
  elements.tzolkinName.src = `img/${tzolkin[1]}.png`;
  elements.glyphG.src = `img/G${lordOfNight}.png`;
  if (haab[0] === 0) {
    elements.haabCoef.src = 'img/chum.png';
  } else {
    elements.haabCoef.src = `img/number-${haab[0]}.png`;
  }
  elements.haabName.src = `img/${haab[1]}.png`;
};

const updateGregDisplay = (gregorianDate) => {
  let gregorianYear = gregorianDate.getFullYear();
  const gregorianEra = (gregorianYear > 0) ? 'CE' : 'BCE';
  if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);
  const gregorianMonth = gregorianDate.getMonth();
  const gregorianDay = gregorianDate.getDate();

  elements.gregorianDay.value = gregorianDay;
  elements.gregorianMonth.value = gregorianMonth;
  elements.gregorianYear.value = gregorianYear;
  elements.gregorianEra.value = gregorianEra;
};

const updateJulianDisplay = (julianDate) => {
  let julianYear = julianDate.getFullYear();
  const julianEra = (julianYear > 0) ? 'CE' : 'BCE';
  if (julianEra === 'BCE') julianYear = -(julianYear - 1);
  const julianMonth = julianDate.getMonth();
  const julianDay = julianDate.getDate();

  elements.julianDay.value = julianDay;
  elements.julianMonth.value = julianMonth;
  elements.julianYear.value = julianYear;
  elements.julianEra.value = julianEra;
};

export const updateAllDisplays = (mayaDate, gregorianDate, julianDate) => {
  updateMayaDisplay(mayaDate);
  updateGregDisplay(gregorianDate);
  updateJulianDisplay(julianDate);
};

