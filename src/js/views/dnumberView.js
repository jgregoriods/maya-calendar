import { dnElements as elements } from './base';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

export const resetFormDisplay = (mayaDate) => {
  const longCount = mayaDate.getLongCount();
  for (let i = 0; i < 5; i++) {
    elements.longCount[i].value = longCount[i];
  };
  elements.distNumberInput.forEach(input => input.value = 0);
  elements.operator.value = '+';
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

const updateDistanceGlyphs = (distanceNumber) => {
  let prefix;
  for (let i = 1; i < 5; i++) {
    if (i === 3) prefix = 'uinal-';
    else prefix = 'number-';
    elements.dnGlyphs[i].src = `img/${prefix}${distanceNumber[i]}.png`;
  }
};

export const updateGlyphDisplay = (prevMayaDate, operator, distanceNumber, nextMayaDate) => {
  updateCalendarGlyphs(prevMayaDate, 'prev');
  updateCalendarGlyphs(nextMayaDate, 'next');
  elements.indicatorGlyph.src = (operator === '+') ? `img/PDI.png` : `img/ADI.png`;
  updateDistanceGlyphs(distanceNumber);
};

const formatWesternDate = (date) => {
  let year = (date.getFullYear() > 0) ? date.getFullYear() : (date.getFullYear() + 1);
  let era = (date.getFullYear() > 0) ? 'CE' : 'BCE';
  return [date.getDate(), months[date.getMonth()], year, era].join(' ');
};

const formatDistNumber = (distanceNumber) => {
  let index = 0;
  for (let i = 0; i < distanceNumber.length; i++) {
    if (distanceNumber[i] > 0) break;
    else index++;
  }
  return distanceNumber.slice(index).join('.');
};

export const addToList = (prevMayaDate, prevWesternDate, operator, distanceNumber, nextMayaDate, nextWesternDate) => {
  let html = `
  <div class="date-item">
    <div class="table-row">
      <div class="table-cell longcount-date" id="lc-1">
        <div class="prev-lc">${prevMayaDate.getLongCount().join('.')}</div>
        <div class="dn">${operator} ${formatDistNumber(distanceNumber)}</div>
        <div class="next-lc">${nextMayaDate.getLongCount().join('.')}</div>
      </div>
      <div class="table-cell cr-date" id="cr-1">
        <div class="prev-cr">${prevMayaDate.getTzolkin().join(' ')} ${prevMayaDate.getHaab().join(' ')}</div>
        <div>&nbsp</div>
        <div class="next-cr">${nextMayaDate.getTzolkin().join(' ')} ${nextMayaDate.getHaab().join(' ')}</div>
      </div>
      <div class="table-cell western-date" id="western-1">
        <div class="prev-west">${formatWesternDate(prevWesternDate)}</div>
        <div>&nbsp</div>
        <div class="next-west">${formatWesternDate(nextWesternDate)}</div>
      </div>
      <div class="table-cell">
        <div>
          <button class="delete-btn">X</button>
        </div>
        <div>&nbsp</div>
        <div>&nbsp</div>
      </div>
    </div>
  </div>
  `;

  elements.dateList.insertAdjacentHTML('beforeend', html);
};

export const deleteFromList = (item) => {
  item.parentNode.removeChild(item);
};