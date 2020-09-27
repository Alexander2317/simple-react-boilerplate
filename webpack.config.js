const path = require('path')
const webpack = require('webpack')
const cssProcessor = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MODE_DEVELOPMENT = 'development'
const PORT = 3000

const PROJECT_FOLDER = 'src'
const BUILD_FOLDER = 'build'

const ENTRY_FILE_NAME = 'index.js'
const BUNDLE_NAME = 'bundle.js'

const REG_EXP = {
  js: /\.jsx?/,
  css: /\.(p?css)$/,
  files: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot|otf)$/,
  fonts: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
}

const getRules = (mode) => [
  {
    test: REG_EXP.js,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader'],
  },
  {
    test: REG_EXP.css,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: mode === MODE_DEVELOPMENT,
          reloadAll: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, 'postcss.config.js'),
            sourceMap: mode === MODE_DEVELOPMENT,
          },
        },
      },
    ],
  },
  {
    test: REG_EXP.fonts,
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'fonts/[name].[ext]',
    },
  },
  {
    test: REG_EXP.files,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:6].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: [0.6, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },
]

const getPlugins = (mode) => [
  new MiniCssExtractPlugin({
    filename: '[name].[hash].bundle.css',
    chunkFilename: '[id].[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode),
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/template/index.html'),
  }),
  mode === MODE_DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),
  mode !== MODE_DEVELOPMENT &&  new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [BUILD_FOLDER] }),
  mode !== MODE_DEVELOPMENT && new CompressionPlugin(),
].filter((plugin) => plugin)

const getOptimization = () => ({
  splitChunks: {
    cacheGroups: {
      styles: {
        test: REG_EXP.css,
        name: 'styles',
        chunks: 'all',
        enforce: true,
      },
    },
  },
  minimizer: [
    new OptimizeCssAssetsPlugin({
      cssProcessor,
      assetNameRegExp: REG_EXP.css,
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      },
      canPrint: true,
    }),
    new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        compress: {
          dead_code: true,
          conditionals: true,
          booleans: true,
        },
        module: false,
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
  ],
})

module.exports = (_, { mode }) => ({
  mode,
  entry: path.resolve(__dirname, PROJECT_FOLDER, ENTRY_FILE_NAME),
  output: {
    path: path.resolve(__dirname, BUILD_FOLDER),
    filename: `[hash].${BUNDLE_NAME}`,
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  devtool: mode === MODE_DEVELOPMENT ? 'eval' : 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, PROJECT_FOLDER),
    open: false,
    clientLogLevel: 'silent',
    port: PORT,
    hot: true,
  },
  module: {
    rules: getRules(mode),
  },
  plugins: getPlugins(mode),
  optimization: getOptimization(),
})
