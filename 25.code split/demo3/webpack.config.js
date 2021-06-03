

 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 /**
  * code split：代码分割
  * 
  * 
  * 
  * 
  */

 module.exports = {
	 entry:"./src/js/index.js",
	 output:{
		 // 去文件名：[name]
		 filename:"js/[name].[contenthash:10].js",
		 path: path.resolve(__dirname, 'build'),
		 publicPath: '',
	 },
	 plugins:[
		 new HtmlWebpackPlugin({
			 template:"./src/index.html"
		 }),
	 ],
	 /***
	  * 1.单入口：可以将 node_modules 中代码单独打包一个 chunk 最终输出
	  * 2.多入口：自动分析多入口 chunk 中，有没有公共的文件，如果有 会打包成单独一个 chunk
	  * 
	  * 
	  */
	 optimization:{
		 splitChunks:{
			 chunks:"all"
		 }
	 },
	 mode:"development",
 };
