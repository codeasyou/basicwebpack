
 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 /**
  * tree shaking：去除无用代码
  * 使用前提条件：1.必须使用 ES6 模块化， 2.开启 production 环境
  * 作用：减少代码体积,去除应用程序中没有使用到的代码，让代码体积变得更小
  *  "sideEffects":false : 所有代码都是没有副作用的代码，都可以进行 tree shaking 
  * 	问题：可能会把 css/@babel/polyfill （副作用）文件干掉
  * "sideEffects":["*.css"]
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
	 ],
	 //开启 production 环境
	 mode:"production",
 };
