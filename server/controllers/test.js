module.exports = function (router) {
  router.post('/test/getTestUserInfo', (req, res) => {
    res.json({
      name: '张三',
      age: 22,
      idCard: '10219i9128309182301893'
    })
  })
}
