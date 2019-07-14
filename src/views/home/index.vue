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
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onload">
        <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
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
    onLoad () {
      console.log('onLoad')
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },

    // 下拉刷新，如果有新数据，则重置列表数据
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
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
