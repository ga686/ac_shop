const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
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
          test: /\.(svg|png)$/,
          use: [
            { loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: `all.css` })]
  }
]