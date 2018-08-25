import MayaDate from './models/MayaDate.js';
import * as convert from './actions/convert.js';

/**
 * MAYA LONG COUNT: Tools for converting between Maya and Western dates
 * Author: Jonas Gregorio de Souza
 * Date: 24.08.2018
 */

const dateController = (function() {
  return {
    addMayaDate: function(longCount) {
      const newMayaDate = new MayaDate(longCount);

      newMayaDate.setTzolkin();
      newMayaDate.setHaab();
      newMayaDate.setLordOfNight();

      return newMayaDate;
    },

    getGregFromMaya: function(mayaDate, constant) {
      return convert.mayaToGreg(mayaDate, constant);
    },

    getMayaDate: function(gregorianDate, constant) {
      const mayaDate = convert.toMaya(gregorianDate, constant);

      mayaDate.setTzolkin();
      mayaDate.setHaab();
      mayaDate.setLordOfNight();

      return mayaDate;
    },

    getJulianFromGreg: function(gregorianDate) {
      return convert.toJulian(gregorianDate);
    },

    getGregFromJulian: function(julianDate) {
      return convert.julianToGreg(julianDate);
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