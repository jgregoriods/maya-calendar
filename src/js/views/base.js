export const lcElements = {
  glyphPanel: document.querySelector('.glyph-panel'),
  mayaForm: document.getElementById('maya-form'),
  correlationForm: document.getElementById('corr-form'),
  gregorianForm: document.getElementById('greg-form'),
  julianForm: document.getElementById('jul-form'),

  longCountInput: document.querySelectorAll('.lc-index'),

  longCount: {
    0: document.getElementById('lc-0'),
    1: document.getElementById('lc-1'),
    2: document.getElementById('lc-2'),
    3: document.getElementById('lc-3'),
    4: document.getElementById('lc-4')
  },
  lcGlyphs: {
    0: document.getElementById('lc-0-coef'),
    1: document.getElementById('lc-1-coef'),
    2: document.getElementById('lc-2-coef'),
    3: document.getElementById('lc-3-coef'),
    4: document.getElementById('lc-4-coef')
  },

  calendarRound: document.getElementById('calendar-round'),
  tzolkinCoef: document.getElementById('tzolkin-coef'),
  tzolkinName: document.getElementById('tzolkin-name'),
  glyphG: document.getElementById('glyph-G'),
  haabCoef: document.getElementById('haab-coef'),
  haabName: document.getElementById('haab-name'),

  constant: document.getElementById('constant'),

  gregorianDay: document.getElementById('greg-day'),
  gregorianMonth: document.getElementById('greg-month'),
  gregorianYear: document.getElementById('greg-year'),
  gregorianEra: document.getElementById('greg-era'),

  julianDay: document.getElementById('jul-day'),
  julianMonth: document.getElementById('jul-month'),
  julianYear: document.getElementById('jul-year'),
  julianEra: document.getElementById('jul-era')
};

export const dnElements = {
  longCountForm: document.getElementById('lc-form'),
  longCountInput: document.querySelectorAll('.lc-index'),
  longCount: {
    0: document.getElementById('lc-0'),
    1: document.getElementById('lc-1'),
    2: document.getElementById('lc-2'),
    3: document.getElementById('lc-3'),
    4: document.getElementById('lc-4')
  },

  distNumberForm: document.getElementById('dn-form'),
  operator: document.getElementById('operator'),
  distNumberInput: document.querySelectorAll('.dn-index'),
  distNumber: {
    1: document.getElementById('dn-1'),
    2: document.getElementById('dn-2'),
    3: document.getElementById('dn-3'),
    4: document.getElementById('dn-4')
  },

  prevCalendarRound: {
    tzolkinCoef: document.getElementById('prev-tzolkin-coef'),
    tzolkinName: document.getElementById('prev-tzolkin-name'),
    haabCoef: document.getElementById('prev-haab-coef'),
    haabName: document.getElementById('prev-haab-name'),
  },
  nextCalendarRound: {
    tzolkinCoef: document.getElementById('next-tzolkin-coef'),
    tzolkinName: document.getElementById('next-tzolkin-name'),
    haabCoef: document.getElementById('next-haab-coef'),
    haabName: document.getElementById('next-haab-name')
  },

  indicatorGlyph: document.getElementById('indicator')
};