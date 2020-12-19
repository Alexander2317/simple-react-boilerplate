const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const MODE_DEVELOPMENT = 'development'
const PORT = process.env.PORT || 3000
const PORT_ANALYZER = process.env.PORT_ANALYZER || 4000

const PROJECT_FOLDER = 'src'
const BUILD_FOLDER = 'build'
const IMAGES_FOLDER = '/assets'
const FAVICON_FOLDER = '/favicon'

const BUNDLE_NAME = 'bundle.js'

const REG_EXP = {
  js: /\.jsx?/,
  css: /\.(p?css)$/,
  files: /\.(png|xml|jpe?g|gif|svg|woff(2)?|ttf|eot|otf)$/,
  fonts: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  modules: /node_modules/,
  src: /src/,
}

const PATH = {
  images: `${PROJECT_FOLDER}${IMAGES_FOLDER}`,
  template: `${PROJECT_FOLDER}/template/index.html`,
}

const isDevMode = (mode) => mode === MODE_DEVELOPMENT

const getRules = (mode) => [
  {
    test: REG_EXP.js,
    exclude: REG_EXP.modules,
    loader: 'babel-loader',
  },
  {
    test: REG_EXP.css,
    include: path.resolve(__dirname, PROJECT_FOLDER),
    exclude: REG_EXP.modules,
    use: [
      MiniCssExtractPlugin.loader,
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
            sourceMap: isDevMode(mode),
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
          name: 'images/[name].[hash:6].[ext]',
          publicPath: 'assets',
          outputPath: 'assets',
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

const getPlugins = (mode) =>
  [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, PATH.template),
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode(mode) ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: isDevMode(mode) ? '[id].css' : '[id].[fullhash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${PATH.images}${FAVICON_FOLDER}`),
          to: `.${IMAGES_FOLDER}${FAVICON_FOLDER}`,
          noErrorOnMissing: true,
        },
      ],
    }),
    isDevMode(mode) && new webpack.HotModuleReplacementPlugin(),
    !isDevMode(mode) &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsOptions: { source: false },
        analyzerPort: PORT_ANALYZER,
      }),
    !isDevMode(mode) &&
      new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [BUILD_FOLDER] }),
    !isDevMode(mode) && new CompressionPlugin(),
  ].filter((plugin) => plugin)

const getOptimization = (mode) => ({
  minimize: !isDevMode(mode),
  minimizer: isDevMode(mode)
    ? []
    : [
        new CssMinimizerPlugin({
          test: REG_EXP.css,
        }),
        new TerserPlugin(),
      ],
})

module.exports = (_, { mode }) => ({
  mode,
  entry: path.resolve(__dirname, PROJECT_FOLDER),
  output: {
    path: path.resolve(__dirname, BUILD_FOLDER),
    filename: isDevMode(mode)
      ? `[name].${BUNDLE_NAME}`
      : `[fullhash].${BUNDLE_NAME}`,
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  devtool: isDevMode(mode) ? 'eval' : 'cheap-module-source-map',
  devServer: {
    port: PORT,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, PROJECT_FOLDER),
    },
  },
  module: {
    rules: getRules(mode),
  },
  plugins: getPlugins(mode),
  optimization: getOptimization(mode),
})
