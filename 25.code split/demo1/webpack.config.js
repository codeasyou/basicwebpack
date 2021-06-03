

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
	// 单入口
	//  entry:"./src/js/index.js",
	entry:{
		//多入口：有一个入口，最终输出就有一个bundle
		main:"./src/js/index.js",
		test:"./src/js/test.js"
	},
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
	 mode:"development",
 };
