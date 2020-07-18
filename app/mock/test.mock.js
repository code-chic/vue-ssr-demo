import mockjs from 'mockjs'

export default function (mock) {
  mock.onGet('/test/getTestData').reply(200, {
    status: 200,
    data: mockjs.mock({
      id: /[a-zA-Z0-9]{6}$/,
      name: mockjs.Random.cword(3),
      idCard: /^\d{5}(19\d{2}|\d{3})((0\d)|(1))((\d)|3)(\d{4}|\d{3}x)$/i,
      desc: '这里是测试数据'
    }),
    errMsg: 'ok'
  })
}
