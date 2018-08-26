const path = require('path');

module.exports = {
  entry: {
    longcount: './src/js/longcount.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
};