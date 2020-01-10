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
  }
}