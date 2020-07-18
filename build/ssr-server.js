const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseOption = require('./webpack.config')('production')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { resolvePath } = require('../shared/util')

const smp = new SpeedMeasurePlugin()

const ssrServerOption = merge(baseOption, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: resolvePath('app/server.js'),

  target: 'node',

  output: {
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    allowlist: /\.css$/
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
})

module.exports = smp.wrap(ssrServerOption)
