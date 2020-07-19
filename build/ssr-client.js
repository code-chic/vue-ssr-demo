const { merge } = require('webpack-merge')
const baseOption = require('./webpack.config')('production')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { resolvePath } = require('../shared/util')

const smp = new SpeedMeasurePlugin()

const ssrClientOption = merge(baseOption, {
  entry: resolvePath('app/client.js'),

  output: {
    filename: 'js/ssr-client.js'
  },

  plugins: [
    new VueSSRClientPlugin()
  ]
})

module.exports = smp.wrap(ssrClientOption)
