//此课程已完结

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

/**
 *  使用 thread-loader ,一般给 babel-loader 使用
 * 下载  npm i thread-loader -D
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
					   use:[
						   /*
						   开启多线程 打包
						   进程启动时间大概为 600ms ，进程通信也有开销。
						   只有工作消耗时间比较长，才需要多进程打包。
						   
						   */
						   {
							   loader:"thread-loader",
							   options:{
								   Workers:2 //进程2个
							   }
						   },
						   {
							   loader:"babel-loader",
							   options:{
								   presets:[[
									   '@babel/preset-env',
								   ]]
							   }
						   }
					   ]
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
		   clientsClaim:true,
		   skipWaiting:true
	   }),
	],
	//开启 production 环境
	mode:"production",
};
