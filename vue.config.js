module.exports = {
  publicPath: '/todo-app/',
  devServer: {
    // proxy: {
    //   '/api': { // 这个是你要替换的位置
    //     // target: 'https://floating-dusk-79176.herokuapp.com/',//这个是被替换的目标地址
    //     target: 'https://localhost:3000',//这个是被替换的目标地址
    //     ws: true ,//接受对方是https的接口
    //     // changeOrigin: true ,// 是否需要跨域
    //     // pathRewrite: {'^/api' : ''}
    //   }
    // }
    proxy: 'https://floating-dusk-79176.herokuapp.com/'
  }
}