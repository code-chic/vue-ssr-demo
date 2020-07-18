import qs from 'qs'
import axios from 'axios'
import mockAdapter from '@/mock/index'
import Config from '@/config/index'

const instance = axios.create({
  baseURL: Config.apiPrefixUrl,
  method: 'POST', // 指定 axios 默认请求方式
  responseType: 'json', // 默认采用 json 格式交互
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }), // 参数序列化
  validateStatus: status => status >= 200 || status < 300, // 验证响应状态
  xsrfCookieName: 'XSRF-COOKIE-CUSTOM',
  timeout: Config.tiemout || 1000, // 设置 api 请求超时时间
  maxRedirects: 3, // 设置最大重定向次数
  withCredentials: false // 跨域是否需要凭证
})

if (process.env.NODE_ENV === 'development') {
  // 使用 mock adapter 适配器属性来拦截 axios 请求
  // 并配合 mockjs 来实现模拟数据
  mockAdapter(instance)
}

// 自定义请求拦截器
instance.interceptors.request.use(
  data => {
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

// 自定义响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// 导出 get 请求方法
export const doGet = (url, params) => instance.get(url, { params })

// 导出 post 请求方法
export const doPost = (url, data, options) => instance.post(url, data, options /* 其它配置项 */)
