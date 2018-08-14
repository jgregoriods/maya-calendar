const tzolkinNames = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan',
  'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc',
  'Chuen', 'Eb', 'Ben', 'Ix', 'Men',
  'Cib', 'Caban', 'Edznab', 'Cauac', 'Ahau'];

const haabNames = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec',
  'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax',
  'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan',
  'Pax', 'Kayab', 'Cumku', 'Uayeb'];

// Alignment between the Julian and (proleptic) Gregorian calendars.

class MayaDate {
  constructor(longCount) {
    this.longCount = longCount;
  }

  calculateTzolkin() {
    const numberOfDays = convertToDecimal(this.longCount);

    // An offset of 4 to account for the base date of 4 Ahau.
    let tzolkinNumber = (numberOfDays + 4) % 13;
    if (tzolkinNumber === 0) tzolkinNumber = 13;

    // An offset of 19 to account for the base date of 4 Ahau.
    const tzolkinName = tzolkinNames[(numberOfDays + 19) % 20];

    this.tzolkin = [tzolkinNumber, tzolkinName];
  }

  calculateHaab() {
    const numberOfDays = convertToDecimal(this.longCount);

    /*
    Start by finding the position in the 365-day year.
    An offset of 348 is due to the base date of 8 Cumku.
    */
    const dayOfYear = (numberOfDays + 348) % 365;
    let haabNumber;
    let haabName;

    /*
    If the date falls in the last 5 days of the year, it is assigned
    to the month 'Uayeb'.
    */
    if (dayOfYear < 361) {
      haabNumber = (dayOfYear % 20);
      haabName = haabNames[Math.floor(dayOfYear / 20)];
    } else {
      haabNumber = dayOfYear - 360;
      haabName = 'Uayeb';
    }
    this.haab = [haabNumber, haabName];
  }

  calculateLordOfNight() {
    const numberOfDays = convertToDecimal(this.longCount);
    if (numberOfDays % 9 === 0) {
      this.lordOfNight = 9;
    } else {
    this.lordOfNight = numberOfDays % 9;
    }
  }
}

/**
 * Converts a Gregorian date to the Maya long count.
 * @param {Date} gregorianDate The date to be converted. Must be a Date object.
 * @param {number} constant A correlation constant representing the number
 * of days from Julian Day zero to the Maya base date 0.0.0.0.0 4 Ahau 8 Cumku.
 * @returns {Object} An object of class MayaDate.
 */
function convertToMaya(gregorianDate, constant) {
  // Find the number of milliseconds between chosen date and the Julian base date
  // and divide by the number of milliseconds in a day.
  const julianZero = new Date (-4713, 10, 24);
  const daysFromJulianZero = Math.round((gregorianDate - julianZero) / 86400000);
  const daysFromMayaZero = daysFromJulianZero - constant;

  return new MayaDate(convertToVigesimal(daysFromMayaZero));
}

/**
 * Converts a Maya date to the Gregorian calendar.
 * @param {Object} mayaDate The date to be converted. Must be an object of class MayaDate.
 * @param {number} constant A correlation constant representing the number
 * of days from Julian Day zero to the Maya base date 0.0.0.0.0 4 Ahau 8 Cumku.
 * @returns {Date}
 */
function convertToGregorian(mayaDate, constant) {
  const daysFromJulianZero = convertToDecimal(mayaDate.longCount) + constant;

  // Julian Day Number Zero.
  const gregorianDate = new Date (-4713, 10, 24);
  gregorianDate.setDate(gregorianDate.getDate() + daysFromJulianZero);

  return gregorianDate;
}

/**
 * Converts a Maya vigesimal number to the decimal system.
 * @param {number[5]} vigesimalNumber The number to be converted. Must be an array
 * of length 5 in the Maya long count format.
 * @returns {number}
 */
function convertToDecimal(vigesimalNumber) {
  const vigesimalPlaces = [144000, 7200, 360, 20, 1];
  let decimalNumber = 0;

  for (i = 0; i < vigesimalPlaces.length; i++) {
    decimalNumber += vigesimalNumber[i] * vigesimalPlaces[i];
  }

  return decimalNumber;
}

/**
 * Converts a decimal number to the Maya vigesimal system.
 * @param {number} decimalNumber The number to be converted.
 * @returns {number[5]} An array of length 5 in the Maya long count format.
 */
function convertToVigesimal(decimalNumber) {
  const vigesimalPlaces = [144000, 7200, 360, 20, 1];
  const vigesimalNumber = [];

  let remainder = decimalNumber;
  for (i = 0; i < vigesimalPlaces.length; i++) {
    vigesimalNumber.push(Math.floor(remainder / vigesimalPlaces[i]));
    remainder %= vigesimalPlaces[i];
  }

  return vigesimalNumber;
}

/**
 * Converts a (proleptic) Gregorian date to the Julian calendar.
 * @param {Date} gregorianDate The date to be converted. Must be a Date object.
 * @returns {Date}
 */
function convertToJulian(gregorianDate) {
  const calendarBase = new Date(200, 2, 1);

  const daysFromBase = (gregorianDate - calendarBase) / 86400000;
  const centuriesFromBase = Math.floor(daysFromBase / 36524);
  const extraLeapYears = Math.floor((centuriesFromBase + 2) / 4);
  const daysToShift = centuriesFromBase - extraLeapYears;

  const julianDate = new Date(gregorianDate.getFullYear(), gregorianDate.getMonth(),
    gregorianDate.getDate());
  julianDate.setDate(gregorianDate.getDate() - daysToShift);
  return julianDate;
}

/**
 * UI
 */

// Initialise all variables.
let currentMayaDate = new MayaDate([0, 0, 0, 0, 0]);

let constant = 584286;

let currentGregorianDate = new Date();
// Hours must be set to zero as differences with the user's time zone may affect the correlation.
currentGregorianDate.setHours(0, 0, 0, 0);
let currentGregorianYear = currentGregorianDate.getFullYear();
let currentGregorianEra = 'CE';

let currentJulianDate = new Date();
currentJulianDate.setHours(0, 0, 0, 0);
let currentJulianYear = currentGregorianYear;
let currentJulianEra = 'CE';

currentMayaDate.longCount = convertToMaya(currentGregorianDate, constant).longCount;
currentMayaDate.calculateTzolkin();
currentMayaDate.calculateHaab();
currentMayaDate.calculateLordOfNight();
updateDisplay();

// Event listeners.
document.querySelector('.glyph-blocks').addEventListener('click', (e) => {

  if (e.target.matches('button')) {
    const button = e.target;
    const action = button.dataset.action;
    const index = button.dataset.index;

    if (action === 'increase') {
      if (index !== 3 && currentMayaDate.longCount[index] < 19) {
        currentMayaDate.longCount[index]++;
      } else if (index === 3 && currentMayaDate.longCount[index] < 17) {
        currentMayaDate.longCount[index]++;
      }
    } else if (currentMayaDate.longCount[index] > 0) {
      currentMayaDate.longCount[index] --;
    }

    currentMayaDate.calculateTzolkin();
    currentMayaDate.calculateHaab();
    currentMayaDate.calculateLordOfNight();
    updateGregorian();
    updateJulian();
    updateDisplay();
  }
});

document.querySelector('.maya-widget').addEventListener('input', (e) => {
  for (i = 0; i < 5; i++) {
    currentMayaDate.longCount[i] = +document.getElementById(`lc-${i}`).value;
  }

  currentMayaDate.calculateTzolkin();
  currentMayaDate.calculateHaab();
  currentMayaDate.calculateLordOfNight();
  updateGregorian();
  updateJulian();
  updateDisplay();
});

document.querySelector('.correlation').addEventListener('input', (e) => {
  constant = +document.getElementById('constant').value;

  updateGregorian();
  updateJulian();
  updateDisplay();
});

document.querySelector('.gregorian-widget').addEventListener('input', (e) => {
  let day = +document.getElementById('greg-day').value;
  let month = +document.getElementById('greg-month').value;
  let year = +document.getElementById('greg-year').value;
  let era = document.getElementById('greg-era').value;

  if (era === 'BCE') {
    year = -(year - 1);
  }

  currentGregorianYear = year;
  currentGregorianDate.setFullYear(year);
  currentGregorianDate.setMonth(month);
  currentGregorianDate.setDate(day);

  currentMayaDate.longCount = convertToMaya(currentGregorianDate, constant).longCount;
  currentMayaDate.calculateTzolkin();
  currentMayaDate.calculateHaab();
  currentMayaDate.calculateLordOfNight();
  updateJulian();
  updateDisplay();
});

function updateDisplay() {
  // Update the Maya Form.
  for (i = 0; i < 5; i++) {
    document.getElementById(`lc-${i}`).value = currentMayaDate.longCount[i];
  }
  document.querySelector('.calendar-round').textContent = `${currentMayaDate.tzolkin.join(' ')} ${currentMayaDate.haab.join(' ')}`;

  // Update the Gregorian Form.
  document.getElementById('greg-day').value = currentGregorianDate.getDate();
  document.getElementById('greg-month').value = currentGregorianDate.getMonth();
  document.getElementById('greg-year').value = currentGregorianYear;
  document.getElementById('greg-era').value = currentGregorianEra;

  // Update the Julian Form.
  document.getElementById('jul-day').value = currentJulianDate.getDate();
  document.getElementById('jul-month').value = currentJulianDate.getMonth();
  document.getElementById('jul-year').value = currentJulianYear;
  document.getElementById('jul-era').value = currentJulianEra;

  // Update the glyph panel
  for (i = 0; i < 5; i++) {
    document.getElementById(`lc-${i}-coef`).src = `./img/number-${currentMayaDate.longCount[i]}.png`;
  }
  document.getElementById('tzolkin-coef').src = `./img/number-${currentMayaDate.tzolkin[0]}.png`;
  document.getElementById('tzolkin-name').src = `./img/${currentMayaDate.tzolkin[1]}.png`;
  if (currentMayaDate.haab[0] === 0) {
    document.getElementById('haab-coef').src = `./img/chum.png`;
  } else {
    document.getElementById('haab-coef').src = `./img/number-${currentMayaDate.haab[0]}.png`;
  }
  document.getElementById('haab-name').src = `./img/${currentMayaDate.haab[1]}.png`;
  document.getElementById('glyph-G').src = `./img/G${currentMayaDate.lordOfNight}.png`;
}

function updateGregorian() {
  const gregorianDate = convertToGregorian(currentMayaDate, constant);
  currentGregorianDate.setDate(gregorianDate.getDate());
  currentGregorianDate.setMonth(gregorianDate.getMonth());
  currentGregorianDate.setFullYear(gregorianDate.getFullYear());

  if (currentGregorianDate.getFullYear() > 0) {
    currentGregorianYear = currentGregorianDate.getFullYear();
    currentGregorianEra = 'CE';
  } else {
    currentGregorianYear = Math.abs(currentGregorianDate.getFullYear() - 1);
    currentGregorianEra = 'BCE';
  }
}

function updateJulian() {
  const julianDate = convertToJulian(currentGregorianDate);
  currentJulianDate.setDate(julianDate.getDate());
  currentJulianDate.setMonth(julianDate.getMonth());
  currentJulianDate.setFullYear(julianDate.getFullYear());

  if (currentJulianDate.getFullYear() > 0) {
    currentJulianYear = currentJulianDate.getFullYear();
    currentJulianEra = 'CE';
  } else {
    currentJulianYear = Math.abs(currentJulianDate.getFullYear() - 1);
    currentJulianEra = 'BCE';
  }
}