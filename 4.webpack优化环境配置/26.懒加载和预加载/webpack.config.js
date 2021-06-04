

 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
/**
 * 懒加载：此处指的是 js 文件的 懒加载; 可以理解为延迟加载
 * 
 * 
 * 
 */

 module.exports = {
	 entry:"./src/js/index.js",
	 output:{
		 filename:"js/[name].[contenthash:10].js",
		 path: path.resolve(__dirname, 'build'),
		 publicPath: '',
	 },
	 plugins:[
		 new HtmlWebpackPlugin({
			 template:"./src/index.html"
		 }),
	 ],

	 optimization:{
		 splitChunks:{
			 chunks:"all"
		 }
	 },
	 mode:"development",
 };
