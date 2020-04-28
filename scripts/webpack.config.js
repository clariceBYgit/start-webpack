// 用于向外暴露node的配置，webpack会进行读取，根据其配置进行执行
const path = require('path')
// html-webpack-plugin  自动生成html（解决每一次的webpack打包后引用文件名改变，导致的手动引入修改的麻烦）
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 如何将css文件单独生成到dist文件夹下？--->解决：webpack 4之后  npm install --save-dev mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// 由于没有babel进行编译
module.exports = { 
    // entry文件入口
    // entry:'./src/qf.js',  等同于以下写法
    entry: {
        // 多个文件，只写入口不写出口的话，出口文件名自动与入口文件名一致
        main: './src/index.js',

    },
    // ouput 文件出口  若没有写 会自动在dist文件夹下生成main.js
    output: {
        path: path.resolve(process.cwd(),"dist"),
        // 与不写出口文件名效果一致
        // filename: '[name].js'
        // 添加hash前缀,并生成对应的字数文件名
        // 问题：其生成的hash值一样  ---->  解决:改为chunkHash
        // filename: '[name].[hash:8].js'  
        // 指定生成的js文件的位置
        filename: 'js/[name].[chunkHash:8].js'
    },
    module:{
        rules:[
        {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader'
            ],
          },
          
        ]
    }
    ,
    plugins: [
        new HtmlWebpackPlugin({
            // 自主定义对应的模板index文件
            title: 'webpack',  
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            // 
            filename: 'css/[name].[chunkHash:8].css'
        })
    ],
    // 配置服务器的端口号
    devServer:{
        port: 3000,
        open: true //是否自动打开
    }
}