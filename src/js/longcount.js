import MayaDate from './models/MayaDate.js';
import * as convert from './models/Convert.js';
import * as mayaView from './views/mayaView.js';
import * as gregorianView from './views/gregorianView.js';
import * as julianView from './views/julianView.js';
import * as constantView from './views/constantView.js';
import { elements } from './views/base.js';

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

const controller = (function(dateCtrl) {
  let currentGregorianDate, currentJulianDate, currentMayaDate, constant;

  function setupCurrentDates() {
    currentGregorianDate = new Date();
    currentJulianDate = dateCtrl.getJulianFromGreg(currentGregorianDate);
    constant = 584286;
    currentMayaDate = dateCtrl.getMayaDate(currentGregorianDate, constant);
  };

  function setupEventListeners() {

    elements.glyphPanel.addEventListener('click', (e) => {
      if (e.target.dataset['action']) {
        changeLongCount(e.target.dataset['action'], e.target.dataset['index']);

        ctrlUpdateGregFromMaya(); //
        ctrlUpdateJulianDate(); //

        updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
      }
    });

    elements.mayaForm.addEventListener('input', (e) => {
      changeMayaDate();

      ctrlUpdateGregFromMaya();
      ctrlUpdateJulianDate();

      updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    elements.correlationForm.addEventListener('input', (e) => {

      ctrlUpdateGregFromMaya(); //
      ctrlUpdateJulianDate(); //

      updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    elements.gregorianForm.addEventListener('input', (e) => {
      changeGregorianDate();
      ctrlUpdateMayaDate();
      ctrlUpdateJulianDate();

      updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
    });

    elements.julianForm.addEventListener('input', (e) => {
      changeJulianDate();
      ctrlUpdateGregFromJulian();
      ctrlUpdateMayaDate();

      updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
    });
  };

  const changeLongCount = (action, index) => {
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

  const changeMayaDate = () => {
    const newLongCount = mayaView.getInput();
    currentMayaDate = dateCtrl.addMayaDate(newLongCount);
  };

  const changeGregorianDate = () => {
    const [newGregorianYear, newGregorianMonth, newGregorianDay] = gregorianView.getInput();
    currentGregorianDate.setFullYear(newGregorianYear);
    currentGregorianDate.setMonth(newGregorianMonth);
    currentGregorianDate.setDate(newGregorianDay);
  };

  const changeJulianDate = () => {
    const [newJulianYear, newJulianMonth, newJulianDay] = julianView.getInput();
    currentJulianDate.setFullYear(newJulianYear);
    currentJulianDate.setMonth(newJulianMonth);
    currentJulianDate.setDate(newJulianDay);
  };

  function ctrlUpdateGregFromMaya() {
    const currentConstant = constantView.getInput();
    currentGregorianDate = convert.mayaToGreg(currentMayaDate, currentConstant);
  };

  function ctrlUpdateGregFromJulian() {
    currentGregorianDate = dateCtrl.getGregFromJulian(currentJulianDate);
  };

  function ctrlUpdateJulianDate() {
    currentJulianDate = dateCtrl.getJulianFromGreg(currentGregorianDate);
  }

  function ctrlUpdateMayaDate() {
    const currentConstant = constantView.getInput();
    currentMayaDate = dateCtrl.getMayaDate(currentGregorianDate, currentConstant);
  };

  const updateAllDisplays = (mayaDate, gregorianDate, julianDate) => {
    mayaView.updateDisplay(mayaDate);
    gregorianView.updateDisplay(gregorianDate);
    julianView.updateDisplay(julianDate);
  }

  return {
    init: function() {
      setupCurrentDates();
      updateAllDisplays(currentMayaDate, currentGregorianDate, currentJulianDate);
      setupEventListeners();
    }
  }
})(dateController);

controller.init();