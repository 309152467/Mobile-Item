const path = require('path')

module.exports = (data) => {
// 如果是 node_modules/vant 相关的文件，则将rootValue 设置为37.5，否则都设置为75
  const rootValue = data.file.dirname.indexOf(`node_modules${path.sep}vant`) !== -1
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
