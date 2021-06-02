
 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
