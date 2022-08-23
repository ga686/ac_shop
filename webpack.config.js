const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[ext]'
            }
          },
          // 配置 image-webpack-loader (第一步)
          {
            loader: 'image-webpack-loader',
            options: {
              // 只在 production 環境啟用壓縮 (第二步)
              disable: process.env.NODE_ENV === 'production' ? false : true
            }
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
}