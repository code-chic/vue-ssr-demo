const path = require('path')

exports.resolvePath = relativePath => {
  return path.join(__dirname, '..', relativePath)
}
