const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseOption = require('./webpack.config')('production')
const externalScriptConfigs = require('./externals').externalScriptConfigs
const { resolvePath } = require('../shared/util')

const smp = new SpeedMeasurePlugin()

const buildOption = merge(baseOption, {
  externals: externalScriptConfigs
    .map(external => {
      return {
        [external.package]: external.globalNamespace
      }
    }),
  plugins: [
    new HtmlPlugin({
      title: 'My Vue.js',
      template: resolvePath('public/index.prod.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        removeComments: false
      },
      externals: {
        scripts: externalScriptConfigs
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})

module.exports = smp.wrap(buildOption)
