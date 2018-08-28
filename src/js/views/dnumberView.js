import { dnElements as elements } from './base';

export const getLongCountInput = () => {
  const longCountArray = [];
  elements.longCountInput.forEach(input => {
    if (input.value) longCountArray.push(parseInt(input.value));
    else longCountArray.push(0);
  });
  return longCountArray;
};

export const getDistNumberInput = () => {
  const operator = elements.operator.value;
  const distNumberArray = [0];
  elements.distNumberInput.forEach(input => {
    if (input.value) distNumberArray.push(parseInt(input.value));
    else distNumberArray.push(0);
  });
  return [operator, distNumberArray];
};

export const updateLCDisplay = (mayaDate) => {
  const longCount = mayaDate.getLongCount();
  for (let i = 0; i < 5; i++) {
    elements.longCount[i].value = longCount[i];
  }
};

const updateCalendarGlyphs = (mayaDate, order) => {
  let calendarRound;
  if (order === 'prev') calendarRound = elements.prevCalendarRound;
  else if (order === 'next') calendarRound = elements.nextCalendarRound;

  const tzolkin = mayaDate.getTzolkin();
  const haab = mayaDate.getHaab();

  calendarRound.tzolkinCoef.src = `img/number-${tzolkin[0]}.png`;
  calendarRound.tzolkinName.src = `img/${tzolkin[1]}.png`;

  if (haab[0] === 0) {
    calendarRound.haabCoef.src = 'img/chum.png';
  } else {
    calendarRound.haabCoef.src = `img/number-${haab[0]}.png`;
  }
  calendarRound.haabName.src = `img/${haab[1]}.png`;
};

export const updateGlyphDisplay = (prevMayaDate, operator, nextMayaDate) => {
  updateCalendarGlyphs(prevMayaDate, 'prev');
  updateCalendarGlyphs(nextMayaDate, 'next');
  elements.indicatorGlyph.src = (operator === '+') ? `img/PDI.png` : `img/ADI.png`;
};