
/**
 * 使用 dll 技术都某些第三方库进行打包，以 jquery 为例
 * 
 * 当你运行 webpack 时，默认查找 webpack.config.js 配置文件
 * 需求：需要运行 webpack.dll.js 文件
 * --> webpack --config webpack.dll.js
 * 
 */

const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry:{
        // 最终生成的 [name] ---jquery
        // ["jquery"] --> 要打包的库是 jquery 
        jquery:["jquery"],
        // react:["react","react-dom","react-router-dom"]
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"dll"),
        library:"[name]_[hash]",//打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        //打包生成一个mainfest.json --->提供和jquery映射
        new webpack.DllPlugin({
            name:"[name]_[hash]",//映射库的暴露的内容名称
            path:path.resolve(__dirname,"dll/manifest.json")//输出文件路径
        })
    ],
    mode:"production"
}