const plugins = {}

if (process.env.NODE_ENV !== 'development') {
  plugins.cssnano = require('cssnano')
}

module.exports = {
  plugins
}
