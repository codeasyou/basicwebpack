const resolve = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//定义 nodejs 环境变量：决定使用browserslist 哪个环境
process.env.NODE_ENV = 'production';

//复用 loader
const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		//还需要在 package.json中定义 browserslist
		loader:'postcss-loader',
		options:{
			ident:"postcss",
			plugins:()=>{
				require('postcss-preset-env')()
			}
		}
	}
];

module.exports = {
	entry:"./src/index.js",
	output:{
		filename:js/built.js"",
		path:resolve(__dirname,"dist");
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[...commonCssLoader]
			},
			{
				test:/\.less$/,
				use:[...commonCssLoader,'less-loader']
			},
			/*
				正常来讲，一个文件只能被一个loader 处理，
				当一个文件要被多个 loader处理，那么一定要指定 loader 执行的先后顺序
					先执行 eslint 再执行 babel
			*/
			
			{
				//在package.json中eslintConfig --airbnb
				test:/\.js$/,
				//优先执行
				enforce:'pre',
				exclude:/node_modules/,
				loader:'eslint-loader',
				options:{
					fix:true
				}
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:[
						[
							'@babel/preset-env',
							{
								useBuilt:'usage',
								corejs:{version:3},
								targets:{
									chrome:"60",
									firfox:"50"
								}
							}
						]
						
					]
				}
			},
			{
				test:/\.(jpg,png,gif)/,
				loader:"url-loader",
				options:{
					limit:8*1024,
					name:'[hash:10].[ext]',
					outputPath:'imgs',
					esModule:false
				}
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				exclude:/\.(js|css|less|html|jpg|png|gif)/,
				loader:'file-loader',
				options:{
					outputPath:'media'
				}
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:"css/built.css"
		}),
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:"./src/index.html",
			minify:{
				//压缩空格
				collapseWhitespace:true,
				//去除注释
				removeComments:true
			}
		});
	],
	mode:"production"
}