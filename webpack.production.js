const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
}
