<template>
  <div class="login-wrap">
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          right-icon="question-o"
          placeholder="请输入手机号"
        />
        <van-field v-model="user.code"
        type="password"
        label="密码"
        placeholder="请输入密码" required />
      </van-cell-group>
      <div class="login-btn">
        <van-button type="info" class="btn" @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
// 哪里用在哪里加载
// import axios from 'axios'
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15122608372',
        code: '123456'
      }
    }
  },
  methods: {
    async handleLogin () {
      // const res = await axios({
      //   method: 'POST',
      //   url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
      //   data: this.user
      // })
      // console.log(res)
      try {
        const data = await login(this.user)
        console.log(data)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
