const express = require('express')
const ejs = require('ejs').__express
const historyApiFallback = require('connect-history-api-fallback')
const __DIR__ = require('../shared/constant').__DIR__
const { resolvePath } = require('../shared/util')

const server = async () => {
  // 初始化 Express 并创建一个 HTTP 服务
  const app = express()
  const router = new express.Router()

  // 安装 express 中间件
  app.use(router)
  app.use(express.static(resolvePath(__DIR__)))
  // 指定 express 模板引擎
  app.set('views', resolvePath(__DIR__))
  app.set('view engine', 'html')
  app.engine('html', ejs)

  return {
    app,
    router
  }
}

server().then(server => {
  const router = server.router
  router.use(historyApiFallback({ index: '/', verbose: true }))
  router.get('/', (req, res) => {
    res.render('index')
  })

  server.app.listen(3000, () => {
    console.log('Server runint at http://localhost:3000')
  })
})
