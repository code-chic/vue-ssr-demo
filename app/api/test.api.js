import * as fetch from '@/util/fetch'

// 获取测试接口数据
export const getTestData = params => fetch.doGet('/test/getTestData', params)

// 新增测试数据接口
export const addTestData = params => fetch.doPost('/test/addTestData', params)

// 获取测试用户信息
export const getTestUserInfo = () => fetch.doPost('/test/getTestUserInfo')

// 获取测试数据列表
export const getTestDataList = () => fetch.doPost('/test/getTestDataList')
