// 封装频道相关接口请求函数
import request from '@/utils/request'
// 获取首页频道列表
// 已登录：用户频道列表
// 未登录：推荐频道列表

export const getUserChannels = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
