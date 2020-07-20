const fs = require('fs')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const baseOption = require('./webpack.config')('development')
const { resolvePath } = require('../shared/util')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 8080
const smp = new SpeedMeasurePlugin()
const setupProxy = resolvePath('app/setupProxy.js')

const devOption = merge(baseOption, {
  plugins: [
    new HtmlPlugin({
      title: 'My Vue.js',
      template: resolvePath('public/index.dev.html'),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // 自定义 webpack overlay 模板风格
    new ErrorOverlayPlugin()
  ],
  // 配置 webpack-dev-server 选项
  devServer: {
    contentBase: false,
    host: HOST,
    port: PORT,
    clientLogLevel: 'info',
    historyApiFallback: true,
    before (app) {
      if (fs.existsSync(setupProxy)) {
        require(setupProxy)(app)
      }
    },
    hot: true,
    open: true,
    overlay: false,
    watchOptions: {
      poll: 2000
    }
  }
})

portfinder.basePort = PORT
/** @returns Promise<webpack.Configuration> */
module.exports = async () => {
  const port = await portfinder.getPortPromise()
  if (port !== PORT) {
    devOption.devServer.port = port
  }
  return smp.wrap(devOption)
}
