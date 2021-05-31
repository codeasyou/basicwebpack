const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:"./src/index.js",
	output:{
		filename:"build.js",
		path:resolve(__dirname,'dist')
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
				
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:"./src/index.html"
		})
	],
	mode:"development"
}