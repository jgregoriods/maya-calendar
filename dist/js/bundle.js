!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const a=e=>{const t=[144e3,7200,360,20,1];let n=0;for(let a=0;a<t.length;a++)n+=e[a]*t[a];return n},o=(e,t)=>{const n=new Date(-4713,10,24),a=Math.round((e-n)/864e5);return new l((e=>{const t=[144e3,7200,360,20,1],n=[];let a=e;for(let e=0;e<t.length;e++)n.push(Math.floor(a/t[e])),a%=t[e];return n})(a-t))},r=["Imix","Ik","Akbal","Kan","Chicchan","Cimi","Manik","Lamat","Muluc","Oc","Chuen","Eb","Ben","Ix","Men","Cib","Caban","Edznab","Cauac","Ahau"],u=["Pop","Uo","Zip","Zotz","Tzec","Xul","Yaxkin","Mol","Chen","Yax","Zac","Ceh","Mac","Kankin","Muan","Pax","Kayab","Cumku","Uayeb"];class l{constructor(e){this.longCount=e}getLongCount(){return this.longCount}setTzolkin(){const e=a(this.longCount);let t=(e+4)%13;0===t&&(t=13);const n=r[(e+19)%20];this.tzolkin=[t,n]}getTzolkin(){return this.tzolkin}setHaab(){const e=(a(this.longCount)+348)%365;let t,n;e<361?(t=e%20,n=u[Math.floor(e/20)]):(t=e-360,n="Uayeb"),this.haab=[t,n]}getHaab(){return this.haab}setLordOfNight(){const e=a(this.longCount);this.lordOfNight=e%9==0?9:e%9}getLordOfNight(){return this.lordOfNight}}const c={longCount:{0:document.getElementById("lc-0"),1:document.getElementById("lc-1"),2:document.getElementById("lc-2"),3:document.getElementById("lc-3"),4:document.getElementById("lc-4")},lcGlyphs:{0:document.getElementById("lc-0-coef"),1:document.getElementById("lc-1-coef"),2:document.getElementById("lc-2-coef"),3:document.getElementById("lc-3-coef"),4:document.getElementById("lc-4-coef")},calendarRound:document.getElementById("calendar-round"),tzolkinCoef:document.getElementById("tzolkin-coef"),tzolkinName:document.getElementById("tzolkin-name"),glyphG:document.getElementById("glyph-G"),haabCoef:document.getElementById("haab-coef"),haabName:document.getElementById("haab-name"),gregorianDay:document.getElementById("greg-day"),gregorianMonth:document.getElementById("greg-month"),gregorianYear:document.getElementById("greg-year"),gregorianEra:document.getElementById("greg-era"),julianDay:document.getElementById("jul-day"),julianMonth:document.getElementById("jul-month"),julianYear:document.getElementById("jul-year"),julianEra:document.getElementById("jul-era")};(function(e,t){let n,a,o,r;function u(){document.querySelector(".glyph-panel").addEventListener("click",r=>{r.target.dataset.action&&(!function(t,n){const a=o.getLongCount().slice();"increase"===t&&"3"!==n&&a[n]<19?a[n]++:"increase"===t&&"3"===n&&a[n]<17?a[n]++:"decrease"===t&&a[n]>0&&a[n]--;o=e.addMayaDate(a)}(r.target.dataset.action,r.target.dataset.index),l(),c(),t.updateDisplay(o,n,a))}),document.getElementById("maya-form").addEventListener("input",r=>{!function(){const n=t.readMayaDate();o=e.addMayaDate(n)}(),l(),c(),t.updateDisplay(o,n,a)}),document.getElementById("corr-form").addEventListener("input",e=>{l(),c(),t.updateDisplay(o,n,a)}),document.getElementById("greg-form").addEventListener("input",e=>{!function(){const[e,a,o]=t.readGregorianDate();n.setFullYear(e),n.setMonth(a),n.setDate(o)}(),g(),c(),t.updateDisplay(o,n,a)}),document.getElementById("jul-form").addEventListener("input",r=>{!function(){const[e,n,o]=t.readJulianDate();a.setFullYear(e),a.setMonth(n),a.setDate(o)}(),n=e.getGregFromJulian(a),g(),t.updateDisplay(o,n,a)})}function l(){const a=t.readConstant();n=e.getGregFromMaya(o,a)}function c(){a=e.getJulianFromGreg(n)}function g(){const a=t.readConstant();o=e.getMayaDate(n,a)}return{init:function(){n=new Date,a=e.getJulianFromGreg(n),r=584286,o=e.getMayaDate(n,r),t.updateDisplay(o,n,a),u()}}})({addMayaDate:function(e){const t=new l(e);return t.setTzolkin(),t.setHaab(),t.setLordOfNight(),t},getGregFromMaya:function(e,t){return((e,t)=>{const n=a(e.getLongCount())+t,o=new Date(-4713,10,24);return o.setDate(o.getDate()+n),o})(e,t)},getMayaDate:function(e,t){const n=o(e,t);return n.setTzolkin(),n.setHaab(),n.setLordOfNight(),n},getJulianFromGreg:function(e){return(e=>{const t=(e-new Date(200,2,1))/864e5,n=Math.floor(t/36524),a=n-Math.floor((n+2)/4),o=new Date(e.getFullYear(),e.getMonth(),e.getDate());return o.setDate(e.getDate()-a),o})(e)},getGregFromJulian:function(e){return(e=>{const t=(e-new Date(200,2,1))/864e5,n=Math.floor(t/36524),a=n-Math.floor((n+2)/4),o=new Date(e.getFullYear(),e.getMonth(),e.getDate());return o.setDate(e.getDate()+a),o})(e)}},{readConstant:function(){const e=parseInt(document.getElementById("constant").value);return e||0},readMayaDate:function(){const e=[];return document.querySelectorAll(".lc-index").forEach(t=>{t.value?e.push(parseInt(t.value)):e.push(0)}),e},readGregorianDate:function(){let e,t;const n=document.getElementById("greg-era").value;return t=document.getElementById("greg-year").value?parseInt(document.getElementById("greg-year").value):1,"BCE"===n&&(t=-(t-1)),[t,parseInt(document.getElementById("greg-month").value),e=document.getElementById("greg-day").value?parseInt(document.getElementById("greg-day").value):1]},readJulianDate:function(){let e,t;const n=document.getElementById("jul-era").value;return t=document.getElementById("jul-year").value?parseInt(document.getElementById("jul-year").value):1,"BCE"===n&&(t=-(t-1)),[t,parseInt(document.getElementById("jul-month").value),e=document.getElementById("jul-day").value?parseInt(document.getElementById("jul-day").value):1]},updateDisplay:function(e,t,n){(e=>{const t=e.getLongCount(),n=e.getTzolkin(),a=e.getHaab(),o=e.getLordOfNight();for(let e=0;e<5;e++)c.longCount[e].value=t[e],c.lcGlyphs[e].src=`img/number-${t[e]}.png`;c.calendarRound.innerHTML=`${n.join(" ")} ${a.join(" ")}`,c.tzolkinCoef.src=`img/number-${n[0]}.png`,c.tzolkinName.src=`img/${n[1]}.png`,c.glyphG.src=`img/G${o}.png`,0===a[0]?c.haabCoef.src="img/chum.png":c.haabCoef.src=`img/number-${a[0]}.png`,c.haabName.src=`img/${a[1]}.png`})(e),(e=>{let t=e.getFullYear();const n=t>0?"CE":"BCE";"BCE"===n&&(t=-(t-1));const a=e.getMonth(),o=e.getDate();c.gregorianDay.value=o,c.gregorianMonth.value=a,c.gregorianYear.value=t,c.gregorianEra.value=n})(t),(e=>{let t=e.getFullYear();const n=t>0?"CE":"BCE";"BCE"===n&&(t=-(t-1));const a=e.getMonth(),o=e.getDate();c.julianDay.value=o,c.julianMonth.value=a,c.julianYear.value=t,c.julianEra.value=n})(n)}}).init()}]);