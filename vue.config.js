module.exports = {
    devServer: {
      // host: '192.168.43.179',
      proxy: {
        '/api': {
          target: 'http://139.224.70.36:8443',
          changeOrigin: true,
          pathRewrite: {
            '^/api':'/'  //请求的时候使用这个api就可以
          }
        },
      }
    }
  }