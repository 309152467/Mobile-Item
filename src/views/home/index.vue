<template>
  <!-- <div>Home component</div> -->
 <div>
  <div class="home">
   <van-nav-bar title="首页"></van-nav-bar>
<!-- activeChannelIndex 绑定当前激活的标签页，使用索引 -->
   <van-tabs v-model="activeChannelIndex">
     <van-tab title="标签1">
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

<script type="text/javascript">
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },

  methods: {
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
</style>
