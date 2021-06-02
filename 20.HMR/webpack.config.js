// 此课程已完结

/***
 * HMR: hot module replacement 热模块替换 / 模块热替换
 * 作用：一个模块发生变化，只会重新打包这个模块，而不是打包所有
 * 极大的提升构建速度
 * 
 * 样式文件：可以使用 HMR 功能：因为 style-loader 内部实现了~
 * js文件：默认没有 HMR 功能 ---> 解决：需要修改 js 代码，添加支持 HMR 功能的代码
 * 		注意：只能 HMR 功能对 js 的处理，只能处理非入口 js 文件的其他文件。
 * html 文件：默认不能使用 HMR 功能，同时会导致问题：html 文件不能热更新了~(不用做 HMR 功能，因为就这一个文件)
 * 		解决：修改 entry 入口，将html 文件引入；entry:["./src/js/index.js","./src/index.html"],
 * 
 * 
 */

 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
	//  entry:"./src/js/index.js",
	entry:["./src/js/index.js","./src/index.html"],
	 output:{
		 filename:"js/built.js",
		 path: path.resolve(__dirname, 'build'),
		 publicPath: '',
	 },
	 module:{
		 rules:[
			{
				test: /\.js$/,  
				exclude: /node_modules/,
				include: /src/,
				loader:"babel-loader",
				options:{
					//预设:指示babel做怎样的兼容性处理
					presets:[
						[
							'@babel/preset-env',
							{
								//按需加载
								useBuiltIns:'usage',
								//指定core-js版本
								corejs:{
									version:3
								},
								//指定兼容性做到哪个版本浏览器
								targets:{
									chrome:'60',
									firefox:'60',
									ie:'9',
									safari:'10',
									edge:'17'
								}
							}
						]
					]
				}
				
			},
			 //loader 的配置
			 {
				 //处理less 资源
				 test:/\.less$/,
				 use:["style-loader","css-loader","less-loader"]
			 },
			 {
				 //处理css 资源
				 test:/\.css$/,
				 use:["style-loader","css-loader"]
			 },
			 {
				 test:/\.(jpg|png|gif|jpeg)$/,
				 use:[{
					 loader:"url-loader",
					 options:{
						 limit:4*1024,
						 name:'[hash:10].[ext]',
						 //关闭es6 模块化
						 esModule:false,
						 outputPath:"imgs"
					 }
				 }]
			 },

			 {
				 test:/\.html$/,
				 use:"html-loader"
			 },
			 {
				 exclude:/\.(html|js|css|less|jpg|png|gif|jpeg)/,
				 use:[{
					loader:"file-loader",
					options:{
						 name:'[hash:10].[ext]',
						 outputPath:'media'
					} 
				 }]
			 },
		 ]
	 },
	 plugins:[
		 new HtmlWebpackPlugin({
			 template:"./src/index.html"
		 }),
	 ],
	 mode:"development",
	 target:"web",
	 devServer:{
		 contentBase:path.resolve(__dirname,"build"),
		 compress:true,
		 port:3000,
		 open:true,
		 //开启HMR功能
		 //当修改了webpack配置，新配置要想生效，必须重新启动webpack
		 hot:true,
	 }
 };