// 网站根目录，同时也是 webpack 输出目录
exports.__ROOT__ = 'dist'

// 在这里可以配置静态资源 cdn
exports.__CDN_URL__ = ''

// MysQL 数据库地址
exports.__MYSQL_DB_HOST__ = '127.0.0.1'

// Mysql 服务端口号
exports.__MYSQL_DB_PORT__ = 3306

// Mysql 数据库名称
exports.__MYSQL_DB_DATABASE__ = 'vue-ssr-demo'

// 是否开启服务端渲染，默认开启
exports._IS_SERVER_RENDERER__ = true
