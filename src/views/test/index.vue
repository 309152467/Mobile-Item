<template>
  <div>
    <p>test page</p>
    <van-cell-group>
  <!-- 1.使用v-validate添加校验规则
       2.为元素设置name属性
       3.将错误消息配置到组件的error-message 属性上 -->
    <van-field
     v-model="username"
     v-validate="'requred'"
     placeholder="请输入用户名"
     name='username'
     type='password'
     :error-message="errors.first('username')"
    />
    </van-cell-group>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'TestIndex',
  data () {
    return {
      username: ''
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
</style>
