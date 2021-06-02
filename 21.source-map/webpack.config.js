// 此课程已完结


 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
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
					]
				}
				
			},
			 {
				 test:/\.less$/,
				 use:["style-loader","css-loader","less-loader"]
			 },
			 {
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
		 hot:true,
	 },
	 //开启source-map ; 执行webpack 会生成一个 map 文件
	 devtool:"source-map"
 };

 /**
  * source-map: 一种提供源代码到构建后代码映射的技术 （如果构建后代码出错了，会通过映射关系可以追踪源代码错误）
  * 	[indne-|hidden-|eval-] [nosources-] [cheap-[module-]]source-map
  * 
  * 	source-map：外部
  * 		错误代码的准确信息 和 源代码的错误位置
  * 
  * 	inline-source-map：内联
  * 		只生成一个内联 source-map
  * 		错误代码的准确信息 和 源代码的错误位置
  * 
  * 	hidden-source-map：外部
  * 		错误代码的准确信息 没有错误位置，不能追踪到源代码的错误，只能提供构建后代码的错误位置
  * 
  * 	eval-source-map: 内联
  * 		每一个文件都生成对应的 source-map, 都在eval中
  * 		错误代码的准确信息 和 源代码的错误位置
  * 
  * 	nosources-source-map：外部
  * 		错误代码的准确信息 但是没有任何源代码信息
  * 
  * 	cheap-source-map: 外部
  * 		错误代码的准确信息 和 源代码的错误位置；但只能精确到错误行，信息不明确
  * 		module会将 loader的source map 加入
  * 
  * 	cheap-module-source-map: 外部
  * 	错误代码的准确信息 和 源代码的错误位置
  * 
  * 内联 和 外部的区别： 1.外部生成了文件，内联没有 2.内联构建速度更快
  * 
  */

 /**
  * 开发环境：速度快，调试更友好
  * 	速度快：eval-source-map>inline-source-map>cheap-source-map
  * 	调试更友好：source-map>cheap-module-source-map>cheap-source-map
  * 	折中：----> eval-source-map
  * 
  * 生产环境：源代码要不要隐藏？调试要不要更友好
  * 	内联会让构建后的代码变得异常庞大，所以生产环境不考虑内联方式
  * 	hidden-source-map 全部隐藏
  * 	nosources-source-map 只隐藏源代码
  * 	折中：----> source-map
  */