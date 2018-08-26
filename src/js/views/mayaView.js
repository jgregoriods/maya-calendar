import { elements } from './base';

export const updateDisplay = (mayaDate) => {
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
}

export const getInput = () => {
  const longCountArray = [];
  elements.longCountInput.forEach(input => {
    if (input.value) longCountArray.push(parseInt(input.value));
    else longCountArray.push(0);
  });

  return longCountArray;
}