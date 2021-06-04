
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/**
    entry:入口起点
    1.string   ---> "./src/index.js" 
        单入口
        打包生成一个chunk,输出一个bundle文件
        此时chunk默认名称为 main,
    2. array ---> ["./src/index.js","./src/add.js"]
        多入口
            所有入口文件只会形成一个 chunk,输出出去只有一个 bundle 文件。
            只有一个用途：只有在 HMR 功能中，让html 文件 热更新生效。
    3.object {index:"./src/index.js",add:"./src/add.js"},
 *      多入口
            有几个入口文件就形成几个chunk,输出几个bundle文件
            此时chunk 的名称就是key
        


    ---> 特殊用法
    {
        所有入口文件只会形成一个 chunk,输出出去只有一个 bundle 文件。
        index:["./src/index.js","./src/count.js"],
        //形成一个chunk,输出一个bundle文件
        add:"./src/add.js"
    },




 */


module.exports = {
    entry:{
        index:["./src/index.js","./src/count.js"],
        add:"./src/add.js"
    },
    output:{
        filename:"./js/[name].js",
        path:path.resolve(__dirname,"build"),
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
}