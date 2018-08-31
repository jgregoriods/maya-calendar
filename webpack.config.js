const path = require('path');

module.exports = {
  entry: {
    longcount: ['babel-polyfill', './src/js/longcount.js'],
    dnumber: ['babel-polyfill', './src/js/dnumber.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};