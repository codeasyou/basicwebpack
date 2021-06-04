
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry:"./src/js/index.js",     
    output:{
        filename:"./js/[name].js",
        path:path.resolve(__dirname,"build"),
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //多个loader 用 use
                use:["style-loader","css-loader"]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development",
    //解析模块的规则
    resolve:{
        //配置解析模块路径别名:优化简写路径，缺点时路径没有提示
        alias:{
            $css:path.resolve(__dirname,'src/css')
        },
        //配置省略文件路径的后缀名
        extensions:[".js",".json",".jsx",".css"],
        //告诉webpack 解析模块是去哪个目录
        modules:[path.resolve(__dirname,"../../node_modules"),"node_modules"]
    }
}