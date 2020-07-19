const { merge } = require('webpack-merge')
const baseOption = require('./webpack.config')('production')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { resolvePath } = require('../shared/util')

const { module: { rules } } = baseOption
rules.forEach((rule, index) => {
  if (rule.test.toString() === '/\\.css$/') {
    rules.splice(index, 1, {
      test: /\.css$/,
      include: resolvePath('app'),
      use: [
        'vue-style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: true
          }
        }
      ]
    })
  }
})

const smp = new SpeedMeasurePlugin()

const ssrServerOption = merge(baseOption, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: resolvePath('app/server.js'),

  target: 'node',

  output: {
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new VueSSRServerPlugin()
  ]
})

module.exports = smp.wrap(ssrServerOption)
