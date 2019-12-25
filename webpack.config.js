const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [ 
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  module: {
    rules: [
      { 
        test: /\.js$/i, exclude: /node_modules/, loader: "babel-loader" 
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: { config: { path: './src/js/postcss.config.js' } }
          }, 
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/i,
        loaders: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              "pretty":true
            }
          }
        ]
      }, 
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /fonts/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        exclude: /img/,
        use: [
          { 
            loader: 'file-loader?name=/fonts/[name].[ext]'
          }
        ]
      },
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: "page/index.html",
      template: './src/page/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyPlugin([
      {
        from: './src/static/sprite.svg',
        to: 'static/',
      }
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}