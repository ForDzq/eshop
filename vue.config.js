const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname,dir) //不要忘记return
}
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js','.vue','.json'],
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages')
      }
    }
  },
  devServer: {
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
}