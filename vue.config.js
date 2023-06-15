const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = defineConfig({
  // transpileDependencies: true,

  chainWebpack:config => {

    config.externals({
      './cptable': 'var cptable',
      '../xlsx.js': 'var _XLSX',
        fs: require('fs')
    })
    if (process.env.NODE_ENV == "production") {
      config.plugins = [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        }),
      ];
    }
    return config;
  }
})
