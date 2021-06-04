
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
    //开启服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer的指令为： npx webpack-dev-server
    devServer:{
        //项目构建后路径
        contentBase:path.resolve(__dirname,"build"),
        //监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
        watchContentBase:true,
        watchOptions:{
            //忽略文件
            ignored:/node_modules/,
        },

        //启动gzip 压缩
        compress:true,
        //端口号
        port:5000,
        //自动打开浏览器
        open:true,
        //域名
        host:"localhost",
        //开启 HMR 功能
        hot:true,

        //不要显示启动服务器日志信息
        clientLogLevel:"none",
        //除了一些基本启动信息以外，其他内容不要显示
        quiet:true,
        //如果出现错误，不要全屏提示~~~
        overlay:false,

        //服务器代理 --->解决开发环境跨域问题
        proxy:{
            //一旦 devServer(5000) 服务器接收到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000)
            '/api':{
                target:"http://localhost:3000",
                //发送请求时，请求路径重写：将 /api/xxx ---> /xxx (去掉 /api)
                pathRewrite:{
                    "^/api":""
                }
            }
        }

    }
}