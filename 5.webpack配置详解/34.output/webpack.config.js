
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/*


*/


module.exports = {
    entry:"./src/index.js",     
    output:{
        //文件名称（指定名称 + 目录）
        filename:"./js/[name].js",
        //输出文件名录（将来所有资源输出的公共目录）
        path:path.resolve(__dirname,"build"),
        //所有资源引入公共资源路径前缀 ---> 'imgs/a.jpg' ----> '/imags/a.jpg'
        publicPath:"/",
        chunkFilename:'./js/[name]_chunk.js',//非入口chunk的名称。
        library:'[name]',//观察main.js 生成内容的区别。整个库向外暴露的变量名
        //libraryTarget:'window',//变量名添加到哪个 browser
        libraryTarget:'global',//变量名添加到哪个 node
        // libraryTarget:'commonjs',
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
}