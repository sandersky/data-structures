var flowStripTypes = require('babel-plugin-transform-flow-strip-types')
var objectAssign = require('babel-plugin-transform-object-assign')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              flowStripTypes,
              objectAssign
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: 'immutable-data-structures.js',
    library: 'ImmutableDataStructures',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }
}
