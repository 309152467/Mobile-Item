<template>
  <!-- <div>Home component</div> -->
 <div>
  <div class="home">
   <van-nav-bar title="首页" fixed></van-nav-bar>
<!-- activeChannelIndex 绑定当前激活的标签页，使用索引 -->
   <van-tabs v-model="activeChannelIndex" class="channel-tabs">
     <van-tab
     v-for="channelItem in channels"
     :key="channelItem.id"
     :title="channelItem.name"
     >
<!--下拉刷新isLoading 用来控制下拉刷新的 loading 状态
       下拉刷新的时候，它会自动将 loading 设置为 true
       @refresh 当下拉刷新的时候会触发
-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
        v-model="channelItem.upPullLoading"
        :finished="channelItem.upPullFinished"
        finished-text="没有更多了"
        @load="onload">
        <van-cell
        v-for="articleItem in channelItem.articles"
        :key="articleItem.art_id"
        :title="articleItem.title"
        />
        </van-list>
      </van-pull-refresh>
     </van-tab>
   </van-tabs>
  </div>
</div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: []
    }
  },
  computed: {
    // 当前激活的频道
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },

  created () {
    this.loadchannels()
  },
  methods: {
    async loadchannels () {
      const { user } = this.$store.state
      let channels = []
      // 已登录
      if (user) {
        const data = await getUserChannels()
        channels = data.channels
      } else {
        // 未登录
        // 如果有本地存储数据则使用本地存储中的频道列表
        const localchannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localchannels) {
          channels = localchannels
        } else {
          // 如果没有本地存储频道数据则请求获取默认推荐频道列表
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      // 修改channels,将这个数据结构修改为满足我们使用的需要
      channels.forEach(item => {
        // 用来存储当前文章的列表
        item.articles = []
        // 存储下一页数据的时间戳
        item.timestamp = Date.now()
        // 控制当前频道的下拉刷新loading状态
        item.downPullLoading = false
        // 控制当前频道的上拉加载更多的loading状态
        item.upPullLoading = false
        // 控制当前频道数据是否加载完毕
        item.upPullFinished = false
      })
      this.channels = channels
    },

    // 上拉加载更多,push数据
    async onLoad () {
      console.log('onload')
      let data = []
      data = await this.loadArtcles()
      // pre_timestamp 下一页的数据(上次时间点推荐的数据)
      // result是文章列表
      // console.log(data)
      // 解决初始化的时候没有最新推荐数据的问题(没有最新数据,那就加载上一次数据)
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArtcles()
      }
      // 数据加载好了以后，将下一页的数据更新到当前频道的，用于加载下一页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中(注意：是push追加，不是覆盖)
      this.activeChannel.articles.push(...data.results)
      //  数据加载完毕后，取消上拉loading
      this.activeChannel.upPullLoading = false
    },
    // 下拉刷新，如果有新数据，则重置列表数据
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },

    async loadArtcles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活频道id
        timestamp, // 用于请求分页的时间戳
        withTop: 1 // 是否包含置顶数据
      })
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
width: 375px;
height: 200px;
background-color: #f40;
}
.channel-tabs{
margin-bottom: 100px;
}
// 深度作用选择器
.channel-tabs /deep/ .van-tabs__wrap{
  position: fixed;
  top: 92px
}
.channel-tabs /deep/ .van-tabs_content{
   margin-top: 100px
}
</style>
