/**
 * MAYA LONG COUNT: Tools for converting between Maya and Western dates
 * Author: Jonas Gregorio de Souza
 * Date: 24.08.2018
 */

const dateController = (function() {
  const tzolkinNames = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Edznab', 'Cauac', 'Ahau'];

  const haabNames = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb'];

  class MayaDate {
    constructor(longCount) {
      this.longCount = longCount;
    }
  
    getLongCount() {
      return this.longCount;
    }

    setTzolkin() {
      const numberOfDays = convertToDecimal(this.longCount);
  
      // An offset of 4 to account for the base date of 4 Ahau
      let tzolkinNumber = (numberOfDays + 4) % 13;
      if (tzolkinNumber === 0) tzolkinNumber = 13;
  
      // An offset of 19 to account for the base date of 4 Ahau
      const tzolkinName = tzolkinNames[(numberOfDays + 19) % 20];
  
      this.tzolkin = [tzolkinNumber, tzolkinName];
    }

    getTzolkin() {
      return this.tzolkin;
    }
  
    setHaab() {
      const numberOfDays = convertToDecimal(this.longCount);
  
      // An offset of 348 is due to the base date of 8 Cumku
      const dayOfYear = (numberOfDays + 348) % 365;
      let haabNumber;
      let haabName;

      if (dayOfYear < 361) {
        haabNumber = (dayOfYear % 20);
        haabName = haabNames[Math.floor(dayOfYear / 20)];
      } else {
        haabNumber = dayOfYear - 360;
        haabName = 'Uayeb';
      }

      this.haab = [haabNumber, haabName];
    }
  
    getHaab() {
      return this.haab;
    }

    setLordOfNight() {
      const numberOfDays = convertToDecimal(this.longCount);
      if (numberOfDays % 9 === 0) {
        this.lordOfNight = 9;
      } else {
      this.lordOfNight = numberOfDays % 9;
      }
    }

    getLordOfNight() {
      return this.lordOfNight;
    }
  }

  // Conversions between numeric systems

  /**
   * Converts a vigesimal number in the Maya system to its decimal equivalent.
   * 
   * @param {Array} vigesimalNumber The vigesimal Maya number to be converted. Must be an array of length 5.
   * @returns {number} A number in the decimal system.
   */
  function convertToDecimal(vigesimalNumber) {
    const vigesimalPlaces = [144000, 7200, 360, 20, 1];
    let decimalNumber = 0;
  
    for (let i = 0; i < vigesimalPlaces.length; i++) {
      decimalNumber += vigesimalNumber[i] * vigesimalPlaces[i];
    }
  
    return decimalNumber;
  }

  /**
   * Converts a decimal number to its equivalent in the Maya vigesimal system.
   * 
   * @param {number} decimalNumber The number to be converted.
   * @returns {Array} A Maya vigesimal number as an array of length 5.
   */
  function convertToVigesimal(decimalNumber) {
    const vigesimalPlaces = [144000, 7200, 360, 20, 1];
    const vigesimalNumber = [];
  
    let remainder = decimalNumber;
    for (let i = 0; i < vigesimalPlaces.length; i++) {
      vigesimalNumber.push(Math.floor(remainder / vigesimalPlaces[i]));
      remainder %= vigesimalPlaces[i];
    }
  
    return vigesimalNumber;
  }

  // Conversions between calendar systems

  /**
   * Converts a Maya date to the Gregorian calendar.
   * 
   * @param {Object} mayaDate The Maya date to be converted. Must be an object of class MayaDate.
   * @param {number} constant The correlation constant to perform the conversion.
   * @returns {Date} A date object.
   */
  function convertMayaToGreg(mayaDate, constant) {
    const daysFromJulianZero = convertToDecimal(mayaDate.getLongCount()) + constant;
  
    // Initially set the Gregorian Date to Julian Day Number Zero
    const gregorianDate = new Date (-4713, 10, 24);
    gregorianDate.setDate(gregorianDate.getDate() + daysFromJulianZero);
  
    return gregorianDate;
  }

  /**
   * Converts a Gregorian date to the Maya calendar.
   * 
   * @param {Date} gregorianDate The date to be converted. Must be a Date object.
   * @param {number} constant The correlation constant to perform the conversion.
   * @returns {Object} An object of class MayaDate.
   */
  function convertToMaya(gregorianDate, constant) {
    const julianZero = new Date (-4713, 10, 24);
    const daysFromJulianZero = Math.round((gregorianDate - julianZero) / 86400000);
    const daysFromMayaZero = daysFromJulianZero - constant;

    return new MayaDate(convertToVigesimal(daysFromMayaZero));
  }

  /**
   * Converts a Gregorian date to the Julian calendar.
   * 
   * @param {Date} gregorianDate The date to be converted. Must be a Date object.
   * @returns {Date} A Date object representing a date in the Julian calendar.
   */
  function convertToJulian(gregorianDate) {
    // Last alignment between Gregorian and Julian calendars
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
   * Converts a Julian date to the Gregorian calendar.
   * 
   * @param {Date} julianDate The date to be converted. Must be a Date object.
   * @returns {Date} A Date object representing a date in the Gregorian calendar.
   */
  function convertJulianToGreg(julianDate) {
    // Last alignment between Gregorian and Julian calendars
    const calendarBase = new Date(200, 2, 1);

    const daysFromBase = (julianDate - calendarBase) / 86400000;
    const centuriesFromBase = Math.floor(daysFromBase / 36524);
    const extraLeapYears = Math.floor((centuriesFromBase + 2) / 4);
    const daysToShift = centuriesFromBase - extraLeapYears;

    const gregorianDate = new Date(julianDate.getFullYear(), julianDate.getMonth(),
    julianDate.getDate());
    gregorianDate.setDate(julianDate.getDate() + daysToShift);

    return gregorianDate;
  }

  return {
    addMayaDate: function(longCount) {
      const newMayaDate = new MayaDate(longCount);

      newMayaDate.setTzolkin();
      newMayaDate.setHaab();
      newMayaDate.setLordOfNight();

      return newMayaDate;
    },

    getGregFromMaya: function(mayaDate, constant) {
      return convertMayaToGreg(mayaDate, constant);
    },

    getMayaDate: function(gregorianDate, constant) {
      const mayaDate = convertToMaya(gregorianDate, constant);

      mayaDate.setTzolkin();
      mayaDate.setHaab();
      mayaDate.setLordOfNight();

      return mayaDate;
    },

    getJulianFromGreg: function(gregorianDate) {
      return convertToJulian(gregorianDate);
    },

    getGregFromJulian: function(julianDate) {
      return convertJulianToGreg(julianDate);
    }
  }
})();

const UIController = (function() {
  return {
    readConstant: function() {
      const constant = parseInt(document.getElementById('constant').value);
      if (constant) return constant;
      else return 0;
    },

    readMayaDate: function() {
      const longCountArray = [];
      const longCountInput = document.querySelectorAll('.lc-index');
      longCountInput.forEach(input => {
        if (input.value) longCountArray.push(parseInt(input.value));
        else longCountArray.push(0);
      });

      return longCountArray;
    },

    readGregorianDate: function() {
      let gregorianDay, gregorianYear;

      const gregorianEra = document.getElementById('greg-era').value;
      if (document.getElementById('greg-year').value) {
        gregorianYear = parseInt(document.getElementById('greg-year').value);
      } else {
        gregorianYear = 1;
      }
      if (gregorianEra === 'BCE') gregorianYear = -(gregorianYear - 1);
      const gregorianMonth = parseInt(document.getElementById('greg-month').value);
      if (document.getElementById('greg-day').value) {
        gregorianDay = parseInt(document.getElementById('greg-day').value);
      } else {
        gregorianDay = 1;
      }

      return [gregorianYear, gregorianMonth, gregorianDay];
    },

    readJulianDate: function() {
      let julianDay, julianYear;

      const julianEra = document.getElementById('jul-era').value;
      if (document.getElementById('jul-year').value) {
        julianYear = parseInt(document.getElementById('jul-year').value);
      } else {
        julianYear = 1;
      }
      if (julianEra === 'BCE') julianYear = -(julianYear - 1);
      const julianMonth = parseInt(document.getElementById('jul-month').value);
      if (document.getElementById('jul-day').value) {
        julianDay = parseInt(document.getElementById('jul-day').value);
      } else {
        julianDay = 1;
      }

      return [julianYear, julianMonth, julianDay];
    },

    updateDisplay: function(currentMayaDate, currentGregorianDate, currentJulianDate) {
      // Update glyph panel and Maya date
      const currentLongCount = currentMayaDate.getLongCount();
      const currentTzolkin = currentMayaDate.getTzolkin();
      const currentHaab = currentMayaDate.getHaab();
      const currentLordOfNight = currentMayaDate.getLordOfNight();

      for (let i = 0; i < 5; i++) {
        document.getElementById(`lc-${i}`).value = currentLongCount[i];
        document.getElementById(`lc-${i}-coef`).src = `img/number-${currentLongCount[i]}.png`;
      }
      document.getElementById('calendar-round').innerHTML = `${currentTzolkin.join(' ')} ${currentHaab.join(' ')}`;
      document.getElementById('tzolkin-coef').src = `img/number-${currentTzolkin[0]}.png`;
      document.getElementById('tzolkin-name').src = `img/${currentTzolkin[1]}.png`;
      document.getElementById('glyph-G').src = `img/G${currentLordOfNight}.png`;
      if (currentHaab[0] === 0) {
        document.getElementById('haab-coef').src = 'img/chum.png';
      } else {
        document.getElementById('haab-coef').src = `img/number-${currentHaab[0]}.png`;
      }
      document.getElementById('haab-name').src = `img/${currentHaab[1]}.png`;

      // Update Gregorian date
      let currentGregorianYear = currentGregorianDate.getFullYear();
      const currentGregorianEra = (currentGregorianYear > 0) ? 'CE' : 'BCE';
      if (currentGregorianEra === 'BCE') currentGregorianYear = -(currentGregorianYear - 1);
      const currentGregorianMonth = currentGregorianDate.getMonth();
      const currentGregorianDay = currentGregorianDate.getDate();

      document.getElementById('greg-day').value = currentGregorianDay;
      document.getElementById('greg-month').value = currentGregorianMonth;
      document.getElementById('greg-year').value = currentGregorianYear;
      document.getElementById('greg-era').value = currentGregorianEra;

      // Update Julian date
      let currentJulianYear = currentJulianDate.getFullYear();
      const currentJulianEra = (currentJulianYear > 0) ? 'CE' : 'BCE';
      if (currentJulianEra === 'BCE') currentJulianYear = -(currentJulianYear - 1);
      const currentJulianMonth = currentJulianDate.getMonth();
      const currentJulianDay = currentJulianDate.getDate();

      document.getElementById('jul-day').value = currentJulianDay;
      document.getElementById('jul-month').value = currentJulianMonth;
      document.getElementById('jul-year').value = currentJulianYear;
      document.getElementById('jul-era').value = currentJulianEra;
    }
  }
})();

const controller = (function(dateCtrl, UICtrl) {
  let currentGregorianDate, currentJulianDate, currentMayaDate, constant;

  function setupCurrentDates() {
    currentGregorianDate = new Date();
    currentJulianDate = dateCtrl.getJulianFromGreg(currentGregorianDate);
    constant = 584286;
    currentMayaDate = dateCtrl.getMayaDate(currentGregorianDate, constant);
  };

  function setupEventListeners() {

    document.querySelector('.glyph-panel').addEventListener('click', (e) => {
      if (e.target.dataset['action']) {
        ctrlChangeLongCount(e.target.dataset['action'], e.target.dataset['index']);
        ctrlUpdateGregFromMaya();
        ctrlUpdateJulianDate();
        UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
      }
    });

    document.getElementById('maya-form').addEventListener('input', (e) => {
      ctrlChangeMayaDate();
      ctrlUpdateGregFromMaya();
      ctrlUpdateJulianDate();
      UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    document.getElementById('corr-form').addEventListener('input', (e) => {
      ctrlUpdateGregFromMaya();
      ctrlUpdateJulianDate();
      UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    document.getElementById('greg-form').addEventListener('input', (e) => {
      ctrlChangeGregorianDate();
      ctrlUpdateMayaDate();
      ctrlUpdateJulianDate();
      UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    document.getElementById('jul-form').addEventListener('input', (e) => {
      ctrlChangeJulianDate();
      ctrlUpdateGregFromJulian();
      ctrlUpdateMayaDate();
      UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
    });
  };

  function ctrlChangeLongCount(action, index) {
    const newLongCount = currentMayaDate.getLongCount().slice();
    if (action === 'increase' && index !== '3' && newLongCount[index] < 19) {
      newLongCount[index]++;
      } else if (action === 'increase' && index === '3' && newLongCount[index] < 17) {
        newLongCount[index]++;
      } else if (action === 'decrease' && newLongCount[index] > 0) {
      newLongCount[index]--;
    }
    currentMayaDate = dateCtrl.addMayaDate(newLongCount);
  };

  function ctrlChangeMayaDate() {
    const newLongCount = UICtrl.readMayaDate();
    currentMayaDate = dateCtrl.addMayaDate(newLongCount);
  };

  function ctrlChangeGregorianDate() {
    const [newGregorianYear, newGregorianMonth, newGregorianDay] = UICtrl.readGregorianDate();
    currentGregorianDate.setFullYear(newGregorianYear);
    currentGregorianDate.setMonth(newGregorianMonth);
    currentGregorianDate.setDate(newGregorianDay);
  };

  function ctrlChangeJulianDate() {
    const [newJulianYear, newJulianMonth, newJulianDay] = UICtrl.readJulianDate();
    currentJulianDate.setFullYear(newJulianYear);
    currentJulianDate.setMonth(newJulianMonth);
    currentJulianDate.setDate(newJulianDay);
  };

  function ctrlUpdateGregFromMaya() {
    const currentConstant = UICtrl.readConstant();
    currentGregorianDate = dateCtrl.getGregFromMaya(currentMayaDate, currentConstant);
  };

  function ctrlUpdateGregFromJulian() {
    currentGregorianDate = dateCtrl.getGregFromJulian(currentJulianDate);
  };

  function ctrlUpdateJulianDate() {
    currentJulianDate = dateCtrl.getJulianFromGreg(currentGregorianDate);
  }

  function ctrlUpdateMayaDate() {
    const currentConstant = UICtrl.readConstant();
    currentMayaDate = dateCtrl.getMayaDate(currentGregorianDate, currentConstant);
  };

  return {
    init: function() {
      setupCurrentDates();
      UICtrl.updateDisplay(currentMayaDate, currentGregorianDate, currentJulianDate);
      setupEventListeners();
    }
  }
})(dateController, UIController);

controller.init();