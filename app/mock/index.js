import MockAdapter from 'axios-mock-adapter'
import testMock from './test.mock'

// 注册模拟接口列表
const registerMocks = [
  testMock
]

export default function mockAdapter (axiosInstance) {
  const mock = new MockAdapter(axiosInstance, { onNoMatch: 'passthrough' })
  registerMocks.forEach(fn => fn.call(mock, mock))
}
