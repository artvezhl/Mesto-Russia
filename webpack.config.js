const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: './src/script.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/ // исключает папку node_modules
    },
    {
      test: /\.css$/i,
      use: [
        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
        {
          loader:'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
            esModule: false
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {}
        },
      ]
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]'
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash()
  ]
}