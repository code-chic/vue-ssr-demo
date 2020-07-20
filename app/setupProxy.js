const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

// 注意，因为该文件在Nodejs环境下执行，所以必须导出
// commonjs2 模块
module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '/' // 根据实际需求，决定是否从写URL
    }
  }))
}
