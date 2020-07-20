const test = require('./test')

const controllers = [
  test
]

exports.registerController = function (router) {
  controllers.forEach(controller => controller(router))
}
