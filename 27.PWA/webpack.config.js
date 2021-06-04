//此课程已完结

 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

 /**
  * PWA：渐进式网络开发应用程序 （离线可访问）
  * 	workbox ----> workbox-webpack-plugin
  * 
  * 先打包 webpack
  * 
  * 再运行 serve -s build
  * 
  * 
  */

 module.exports = {
	entry:"./src/js/index.js",
	 output:{
		 filename:"js/built.[contenthash:10].js",
		 path: path.resolve(__dirname, 'build'),
		 publicPath: '',
	 },
	 module:{
		 rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				enforce:'pre',
				loader:"eslint-loader",
				options:{
					fix:true
				}
			 },
			{
				oneOf:[
					{
						test: /\.js$/,  
						exclude: /node_modules/,
						include: /src/,
						loader:"babel-loader",
					},
					 {
						 test:/\.less$/,
						 use:["style-loader","css-loader","less-loader"]
					 },
					 {
						 test:/\.css$/,
						 use:[MiniCssExtractPlugin.loader,"css-loader"]
					 },
					 {
						 test:/\.(jpg|png|gif|jpeg)$/,
						 use:[{
							 loader:"url-loader",
							 options:{
								 limit:4*1024,
								 name:'[hash:10].[ext]',
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
			}
		 ]
	 },
	 plugins:[
		 new HtmlWebpackPlugin({
			 template:"./src/index.html"
		 }),
		 new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:10].css",
        }),
		new WorkboxWebpackPlugin.GenerateSW({
			/**
			 * 1. 帮助 serviceworker快速启动
			 * 2. 删除旧的 serviceworker
			 * 
			 * 	最终生成一个 serviceworker 配置文件
			 * 
			 */
			/***
				 1.eslint 不认识 navigator 全局变量
					解决：需要修改package.json 中eslint 配置
					"env":{
						"browser":true //支持浏览器全局变量
					}
				2.sw 代码必须运行再服务器上
					---> nodejs
					---> npm i serve -g
					serve -s build (build 指运行代码的目录) ： 启动服务器，将 build 目录下所有资源作为静态资源暴露出去
			* 
			*/
			clientsClaim:true,
			skipWaiting:true
		}),
	 ],
	 //开启 production 环境
	 mode:"production",
 };
