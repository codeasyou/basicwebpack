const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    //入口起点
    entry:"./src/index.js",
    output:{
        //输出文件名
        filename:"built.js",
        //输出路径
        //__dirname nodejs 的变量，代表当前文件的目录的绝对路径
        path:path.resolve(__dirname,"build")
    },
    //loader 的配置
    module:{
        //详细的 loader 配置
        rules:[
            {
                //匹配哪些文件
                test:/\.css$/,
                //使用哪些loader 进行处理
                use:[
                    //use 数组中loader 执行顺序：从右到左，从下到上，依次执行
                    //创建 style 标签：将js 中的样式资源插入进行，添加到head 中生效
                    "style-loader",
                    "css-loader"
                ],
                include:/src/,
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //将less 文件编译成 css 文件
                    "less-loader"
                ],
            }
        ]
    },
    //plugins 的配置
    plugins:[
        //详细的 plugins的配置
        new HtmlWebpackPlugin()
    ],
    mode:"development",//开发模式
    // mode:"production"
}