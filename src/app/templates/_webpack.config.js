const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: 'source-map',
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['alexa-sdk', 'i18next', 'i18next-sprintf-postprocessor']
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [{ test: /\.ts(x?)$/, loader: 'ts-loader' }]
  }
}
