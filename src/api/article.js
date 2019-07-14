// 封装文章相关接口请求函数
import request from '@/utils/request'
// 获取频道新闻推荐数据
export const getArticles = ({
  channelId, // 频道
  timestamp, // 时间戳
  withTop // 是否包含定置文章
}) => {
  return request({
    methods: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
