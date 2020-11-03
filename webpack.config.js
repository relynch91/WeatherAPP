const path = require('path')
const webpack = require('webpack')
const config = {
  entry: path.join(__dirname, './public/javascripts/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public')
  },
  plugins: [
    new webpack.ProgressPlugin()
  ],
  // watch: true,
  devtool: 'source-map',
}
module.exports = config