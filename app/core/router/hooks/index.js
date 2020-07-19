import verifyLoginAuthenticate from './verifyLoginAuthenticate'

const hooks = new Set()
hooks.add(verifyLoginAuthenticate) // 注册登录校验拦截器

export default function registerRouterHooks (router) {
  hooks.forEach(hook => hook.call(router, router))
}
