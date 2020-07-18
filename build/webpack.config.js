const PnpWebpackPlugin = require('pnp-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolvePath } = require('../shared/util')

const {
  __DIR__,
  __CDN_URL__
} = require('../shared/constant')

/**
 * webpack 基础公共配置
 * @param { 'production' | 'development' | 'test' } env
 * @returns { webpack.Configuration }
 */
module.exports = env => {
  const isEnvProduction = env === 'production'
  const isEnvDevelopment = env === 'development'
  // eslint-disable-next-line no-unused-vars
  const isEnvTest = env === 'test'

  const getAssetOutput = () => {
    if (isEnvDevelopment) {
      return {
        path: resolvePath(__DIR__),
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: ''
      }
    }
    return {
      path: resolvePath(__DIR__),
      filename: 'js/[name].[contenthash:6].js',
      chunkFilename: 'js/[id].[contenthash:6].js',
      publicPath: __CDN_URL__
    }
  }

  return {
    // 指定 webpack 入口
    entry: {
      app: resolvePath('app/client.js')
    },

    output: getAssetOutput(),

    mode: env,

    devtool: isEnvDevelopment ? 'cheap-module-source-map' : 'source-map',

    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: require.resolve('vue/dist/vue.esm'),
        vuex$: require.resolve('vuex/dist/vuex.esm'),
        'vue-router': require.resolve('vue-router/dist/vue-router.esm'),
        '@': resolvePath('app')
      },
      plugins: [
        PnpWebpackPlugin
      ]
    },

    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },

    module: {
      rules: [
        isEnvProduction && {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          include: resolvePath('app'),
          loader: require.resolve('eslint-loader'),
          options: {
            fix: true,
            lintOnSave: true
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            optional: 'runtime',
            cacheDirectory: true
          }
        },
        {
          test: /\.css$/,
          include: resolvePath('app'),
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          include: resolvePath('app'),
          loader: require.resolve('vue-loader'),
          options: {
            hotReload: isEnvDevelopment
          }
        },
        {
          test: /\.(png|gif|jpg)$/,
          include: require.resolve('app'),
          loader: require.resolve('url-loader'),
          options: {
            esModule: false,
            outputPath: 'images',
            limit: 10000,
            quality: 85
          }
        }
      ].filter(Boolean)
    },

    plugins: [
      new VueLoaderPlugin(),
      // 非开发环境通过使用 `MiniCssExtractPlugin` 插件来抽离样式并单独打包
      // 到文件中，并采用 contenthash 的方式来命名文件，方便用于控制客户端浏览器缓存
      !isEnvDevelopment && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:6].css',
        chunkFilename: 'css/[id].[contenthash:6].css',
        publicPath: 'css'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        reportFilename: resolvePath('reports/reports.html'),
        statsFilename: resolvePath('reports/stats.json'),
        openAnalyzer: false,
        logLevel: 'info'
      })
    ].filter(Boolean)
  }
}
