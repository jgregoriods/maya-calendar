import MayaDate from './models/MayaDate.js';
import * as convert from './models/Convert.js';
import * as mayaView from './views/mayaView.js';
import * as westernView from './views/westernView';

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
      mayaView.renderGlyphs(currentMayaDate);
      westernView.renderGregorian(currentGregorianDate);
      westernView.renderJulian(currentJulianDate);
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