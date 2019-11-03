const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry:['babel-polyfill','./index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'/dist')
  },
  devServer: {
    contentBase:'./dist',
    hot:true,
    compress: true,
    clientLogLevel: "none",
    quiet: true,
    host:'localhost',
    port:8080
  },
  module: {
    rules: [
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        test:/\.js$/,
        loader:'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template:'./index.html'}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].less')
  ]
}
