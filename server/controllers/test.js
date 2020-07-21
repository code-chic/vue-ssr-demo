module.exports = function (router) {
  router.post('/test/getTestUserInfo', (req, res) => {
    res.json({
      name: '张三',
      age: 22,
      idCard: '10219i9128309182301893'
    })
  })

  router.post('/test/getTestDataList', (req, res) => {
    res.json({
      status: 200,
      data: [
        { id: '01', name: '张三', age: 20, sex: 1 },
        { id: '02', name: '李四', age: 18, sex: 1 },
        { id: '03', name: '王五', age: 22, sex: 2 }
      ],
      errMsg: 'ok'
    })
  })
}
