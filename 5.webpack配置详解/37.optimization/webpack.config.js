
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");


module.exports = {
    entry:"./src/js/index.js",     
    output:{
        filename:"./js/[name].[contenthash:10].js",
        path:path.resolve(__dirname,"build"),
        chunkFilename:"./js/[name]_[contenthash:10]chunk.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"production",
    resolve:{
        alias:{
            $css:path.resolve(__dirname,'src/css')
        },
        extensions:[".js",".json",".jsx",".css"],
        modules:[path.resolve(__dirname,"../../node_modules"),"node_modules"]
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            /**  以下配置是默认值，一般情况下不要修改
            minSize:30*1024,//分割的chunk 最小为30kb,
            maxSize:0,//最大没有限制
            minChunks:1,//要提取的chunks 最好被引用1次，
            maxAsyncRequests:5,//按需加载时并行加载的文件最大数量为5
            maxInitialRequests:3,//入口js 文件最大并行请求数量
            automaticNameDelimiter:"~",//名称连接符
            name:true,//可以使用命名规则
            cacheGroups:{//分割 chunk 的组
                //node_modules 文件会被打包到 vendors 组的chunk中。 ---> vendors~xxx.js
                //满足上面的公共规则，如大小要超过30kb, 至少被引用一次
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    //优先级
                    priority:-10
                },
                default:{
                    //要提取的 chunk 最少被引入用 2 次
                    minChunks:2,
                    //优先级
                    priority:-20,
                    //如果当前要打包的模块，和之前已经被提取的是同一个模块，就会复用，而不是重新打包模块。
                    reuseExistingChunk:true
                }
            } */
        },
        //代码分割，一定加上
        //解决了：修改 a 文件导致 b 文件的 contenthash 变化的bug
        runtimeChunk:{
            //将当前模块记录其他模块的 hash 单独打包成一个文件 runtime
            name:entrypoint=>`runtime-${entrypoint.name}`
        },
        minimize: true,
        minimizer:[
            //配置生产环境的压缩方案： js 和 css
            //由于webpack 版本问题报错 TypeError: Cannot read property 'javascript' of undefined
            /**
             new TerserWebpackPlugin({
                //开启缓存
                //cache:true,
                //开启多进程打包
                //parallel: true,
                //启动 source-map
                //sourceMap:true
            })
            */
        ]
    }
}