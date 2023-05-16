const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,

  //配置代理到后端
  devServer: {
    port: 80,
    proxy: {
      '/api': {
        //后端服务器接口
        target: 'http://localhost:10000',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
