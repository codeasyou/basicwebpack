const path = require("path");
const HtmlWebPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	output:{
		filename:"build.js",
		path:path.resolve(__dirname,"build")
	},
	module:{
		
	},
	plugins:[
		new HtmlWebPlugin({
			template:"./src/index.html"
		})
	],
	mode:"development"
}

// 针对多入口文件的项目
const webpack = require("webpack");//引入webpack
//引入node.js中的path模块，用于处理文件和目录的路径
const path = require("path");
//提取css文件为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//生成一个html文件
const HtmlWebpackPlugin = require(require.resolve('html-webpack-plugin', { paths: [process.cwd()] }));

module.exports = {
    //入口起点
    entry:{
        busiChoose:"./src/esim/js/busiChoose/busiChoose.js",
        busiDeal:"./src/esim/js/busiDeal/busiDeal.js"
    },
    devtool: 'inline-source-map',
    //输出
    output:{
        //输出文件名
        filename:'esim/js/[name]/[name].js',
        //输出路径
        //__dirname nodejs的变量，代表当前文件的目录绝对路径
        //resolve 用来拼接绝对路径的方法
        path:path.resolve(__dirname,'dist'),
    },
    //loader的配置
    //加载器，让 webpack 拥有加载和解析非 javascript 文件的能力 
    module: {  
        rules: [
            //详细loader配置
            {
                //匹配哪些文件
                test: /\.css$/i,
                //使用哪些loader进行处理
                use: [
                    //use 数组中 loader 执行顺序，从右到左，从下到上 依次执行
                    //创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
                    "style-loader",                    
                    //将 css 文件变成 commonjs 模块加载到 js 中，里面内容是样式字符串
                    "css-loader"
                ]
            },
            {  
                test: /\.js$/,  
                exclude: /node_modules/,  
                loader: 'babel-loader'  
            },
            {
                //处理不了html中的图片
                //处理图片资源
                test: /\.(jpg|png|jsp|gif)/,
                //下载 url-loader file-loader
                use: [{
                    //
                    loader: 'url-loader',
                    options: {
                        //url-loader 配置
                        //图片体积小于 8kb，就会被base64处理
                        //优点：减少请求数量（减轻服务器压力）
                        //缺点：处理后的体积会更大（文件请求速度更慢）
                        //所以，通常只对体积小于12kb的图片进行 base64 处理，
                        limit: 100*1024,
                        //问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是commonjs
                        //解析会出现问题：[object Module]
                        //解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
                        esModule:false,
                        //给图片重命名
                        //[hash:10]取图片的hash的前10位
                        //[ext]取文件原扩展名
                        name:'[hash:10].[ext]'

                    }
                }]
            },
        ]  
    },
    //plugins 的配置
    //插件 扩展 webpack 功能，让 webpack 具有更多的灵活性 
    plugins: [
        //详细的plugins的配置

        //打包成单独的css文件
        new MiniCssExtractPlugin({
            //通过参数 filename重新命名提取的css文件名
            filename: "esim/css/[name].css",
            chunkFilename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            title:"通用-业务选择",//页面标题名称
            favicon:"",//添加特定的 favicon 路径到输出的 HTML文件中
            filename:'esim/html/busiChoose/busiChoose.html',//生成的html路径和名称
            template: './src/esim/html/busiChoose/busiChoose.html',//源模板文件
            inject:"body",////js资源加入到底部
            hash:true,//加入版本号，如果true将webpack所有包含的脚本和CSS文件附加一个独特的编译哈希。这对缓存清除非常有用 
            chunks:["busiChoose"],//代码分割打包，只引入本页面的css js 文件      
        }),
        new HtmlWebpackPlugin({
            title:"通用-业务办理",
            favicon:"",
            filename:'esim/html/busiDeal/busiDeal.html',
            template: './src/esim/html/busiDeal/busiDeal.html',
            inject:"body",
            hash:false,
            chunks:["busiDeal"]
        }),
        new webpack.HotModuleReplacementPlugin(),//热更新插件
    ],

    //配置热更新信息
    devServer:{
        contentBase:path.resolve(__dirname,"./src/esim/html/"),//指定一个本地服务器路径，否则会默认为根目录
        host:"localhost",//服务器的ip地址，可以使用IP也可以使用localhost
        //inline:true,//自动刷新模式
        //compress:true,//是否启用服务器压缩
        port:8089,//默认为8080
        //hot:true,//代表开启热更新
        open:true,//自动拉起浏览器
    },

    //模式
    mode:"development",
}