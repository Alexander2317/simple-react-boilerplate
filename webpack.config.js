const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => ({
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: false,
    clientLogLevel: 'silent',
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(p?css)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env.NODE_ENV === 'development',
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
                sourceMap: env.NODE_ENV === 'development',
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|gif|jpe?g|svg)/,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
