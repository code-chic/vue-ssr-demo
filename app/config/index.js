export default {
  apiPrefixUrl: process.env.NODE_ENV === 'development' ? '/api' : 'http://127.0.0.1:3000', // API访问前缀
  isCheckLogin: true, // 是否需要登录认证
  tiemout: 3000, // API请求超时时间
  p: -1
}
