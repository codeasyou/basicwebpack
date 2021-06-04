
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { loader } = require("mini-css-extract-plugin");

module.exports = {
    entry:"./src/index.js",     
    output:{
        filename:"./js/[name].js",
        path:path.resolve(__dirname,"build"),
    },
    module:{
        rules:[
            //loader 的配置

            {
                test:/\.css$/,
                //多个loader 用 use
                use:["style-loader","css-loader"]
            },
            {
                test:/\.js$/,
                //排除 node_module 下的 js 文件
                exclude:/node_module/,
                //只检查 src 下的文件
                include:/src/,
                //优先执行
                enforce:"pre",
                //延后执行
                // enforce:"post",

                //单个loader 用 loader 
                use:"eslint-loader"
            },
            {
                //以下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
}