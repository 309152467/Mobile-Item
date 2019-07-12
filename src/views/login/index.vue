<template>
  <div class="login-wrap">
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"

          v-validate="'required'"
          name='mobile'
          :error-message="errors.first('mobile')"

          required
          clearable
          label="手机号"
          right-icon="question-o"
          placeholder="请输入手机号"
      />

        <van-field
        v-model="user.code"
        v-validate="'required'"
        name='code'
        :error-message="errors.first('code')"
        type="code"
        label="验证码"
        placeholder='请输入验证码'
        required
      />
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
  created () {
    this.configCustomMessages()
  },
  methods: {
    async handleLogin () {
      // if (this.user.mobile.trim().length) {
      //   this.mobileMessage = ''
      // } else {
      //   this.mobileMessage = '请输入手机号'
      //   return
      // }

      try {
        // const data = await login(this.user)
        this.$validator.validate().then(async valid => {
          // 如果表单验证失败，则什么都不做
          if (!valid) {
            return
          }
          // 表单验证通过,提交表单
          const data = await login(this.user)

          // console.log(data)
          // 通过提交mutation更新vuex容器中的装填
          this.$store.commit('setUser', data)
        })
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    },
    configCustomMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: () => '验证码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
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
