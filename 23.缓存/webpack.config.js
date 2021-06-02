

 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 
 * 缓存：
 * 	babel 缓存
 * 		cacheDirectory:true
 * 	文件资源缓存
 * 		hash: 每次webpack 构建打包生成唯一hash 值
 * 			问题：js 和 css 使用同一个hash 值。
 * 				如果重新打包，会导致所有缓存实现。（可能我只改动一个文件，导致所有缓存失效）
 * 			解决：chunkhash:根据 chunk 生成的hash ，如果打包来自同一个chunk，那么hash值就一样
 * 				问题：js 和 css 的hash 值还是一样的。因为css 是在 js 中被引入的，所以同属一个chunk
 *终极解决方案--> 解决：contenthash: 根据文件的内容生成hash,不同文件hash值一定不一样
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
						options:{
							presets:[
								[
									'@babel/preset-env',
									{
										useBuiltIns:'usage',
										corejs:{
											version:3
										},
										targets:{
											chrome:'60',
											firefox:'60',
											ie:'9',
											safari:'10',
											edge:'17'
										}
									}
								]
							],
							//开启 babel 缓存
							//第二次构建时，会读取之前的缓存
							cacheDirectory:true
						}
						
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
	 mode:"production",
	 target:"web",
	 devServer:{
		 contentBase:path.resolve(__dirname,"build"),
		 compress:true,
		 port:3000,
		 open:true,
		 hot:true,
	 },
	 devtool:"source-map"
 };
