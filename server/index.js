const express = require('express')
const ejs = require('ejs').__express
const historyApiFallback = require('connect-history-api-fallback')
const { createBundleRenderer } = require('vue-server-renderer')
const __ROOT__ = require('../shared/constant').__ROOT__
const { resolvePath } = require('../shared/util')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  clientManifest
})

const server = async () => {
  // 初始化 Express 并创建一个 HTTP 服务
  const app = express()
  const router = new express.Router()

  // 安装 express 中间件
  app.use(router)
  app.use(express.static(resolvePath(__ROOT__)))
  // 指定 express 模板引擎
  app.set('views', resolvePath(__ROOT__))
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
    const context = { url: req.originalUrl }
    // eslint-disable-next-line handle-callback-err
    renderer.renderToString(context, (err, html) => {
      // eslint-disable-next-line handle-callback-err
      res.render('index', { context }, (err, data) => {
        data = data.replace('<!--vue-ssr-state-->', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>`)
        data = data.replace('<!--vue-ssr-outlet-->', html)
        res.send(data)
      })
    })
  })
  server.app.listen(3000, () => {
    console.log('Server runint at http://localhost:3000')
  })
})
