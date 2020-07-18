module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 生产环境下禁止使用 console 在控制台输出
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 生产环境下禁止使用 debugger 调试模式
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 生产环境下禁止使用 alert 警告框
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
