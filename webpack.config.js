const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.(jsx|js)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  mode: 'development',
}