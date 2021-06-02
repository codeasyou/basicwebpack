/**
 * 开发环境配置：能让代码运行
 * 运行项目指令：
 * webpack 会将打包结果输出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 * 
 * */
 
 const { resolve } = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
	 entry:"./src/index.js",
	 output:{
		 filename:"built.js",
		 path:resolve(__dirname,"build"),
	 },
	 module:{
		 rules:[
			{
				/*
					js 兼容性处理：babel-loader @babel @babel/preset-env
						1.基本兼容性处理 --> @babel/preset-env
						问题：只能做基本兼容性处理，像promise这些东西无法转换。
						2.全部js兼容性处理  --> @babel/polyfill
						问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大~
						3.需要做兼容性处理的就做：按需加载  --> corejs npm install core-js -D
				*/
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
				 //处理图片 资源
				 test:/\.(jpg|png|gif)$/,
				 use:[{
					 loader:"url-loader",
					 options:{
						 limit:8*1024,
						 name:'[hash:10].[ext]',
						 //关闭es6 模块化
						 esModule:false,
						 outputPath:"imgs"
					 }
				 }]
			 },

			 {
				 //处理html 中的img资源
				 test:/\.html$/,
				 use:"html-loader"
			 },
			 {
				 //处理其他资源
				 exclude:/\.(html|js|css|less|jpg|png|gif)/,
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
		 //plugins 的配置
		 new HtmlWebpackPlugin({
			 template:"./src/index.html"
		 }),
	 ],
	 mode:"development",
	 target:"web",
	 devServer:{
		 //项目构建后的路径
		 contentBase:resolve(__dirname,"build"),
		 compress:true,
		 port:3000,
		 open:true,
	 }
 };