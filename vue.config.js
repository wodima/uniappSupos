module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://220.180.192.175:8081/openapi',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/bpi': {
        target: 'http://220.180.192.175:8081/openapi',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bpi': ''
        }
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}