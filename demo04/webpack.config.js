var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      }
    ],
  },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true,
    before: (app) =>{
      app.get('/one.json', function(req, res) {
        res.json({ 
          user: 'promise',
          success: false
        });
      });
      app.get('/two.json', function(req, res) {
        res.json({ 
          age: '11',
          success: true
        });
      });
      app.get('/three.json', function(req, res) {
        res.json({ 
          hobby: 'basketball',
          success: true
        });
      });
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}