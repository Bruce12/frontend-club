// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const name = '前端club'
const devServerPort = 3008
const svgFilePath = path.resolve(__dirname, './src/icons/svg')
module.exports = {
  publicPath: '/',
  css: {
    extract: {
      filename: 'css/[name].css?v=[hash:6]',
      chunkFilename: 'css/[name].css?v=[hash:6]'
    }
  },
  chainWebpack(config) {
    config.module
      .rule('vue-svgicon')
      .include.add(svgFilePath)
      .end()
      .test(/\.svg$/)
      .use('svgicon')
      .loader('@yzfe/svgicon-loader')
      .options({
        svgFilePath
      })
    config.module.rule('svg').exclude.add(svgFilePath).end()
    // Recommended configuration transformAssetUrls
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap((opt) => {
    //     opt.transformAssetUrls = opt.transformAssetUrls || {}
    //     opt.transformAssetUrls.icon = ['data']
    //     return opt
    //   })

    // Recommended configuration alias
    config.resolve.alias.set('@icon', svgFilePath)
    config.set('name', name)
    return config
  },
  // 配置webpack
  configureWebpack: {
    devServer: {
      port: devServerPort,
      open: true,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: {
        '/api': {
          target: '',
          secure: false,
          ws: false
        }
      }
    },
    performance: {
      maxEntrypointSize: 3072000,
      maxAssetSize: 3072000
    },
    output: {
      filename: 'js/[name].js?v=[hash:6]',
      chunkFilename: 'js/[name].js?v=[hash:6]'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_CONF_ENV: JSON.stringify(process.env.VUE_CONF_ENV)
        }
      })
    ],
    optimization: {
      minimize: process.env.NODE_ENV === 'production',
      minimizer: [
        new CssMinimizerPlugin()
      ]
    }
  }
}
