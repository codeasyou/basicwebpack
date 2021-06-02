// 此课程已完结

const resolve = require("path");
//处理 css 样式资源
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩 css 文件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//处理 html 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

//定义 nodejs 环境变量：决定使用 browserslist 哪个环境---->postcss-loader
process.env.NODE_ENV = 'production';

//复用 loader
const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		//还需要在 package.json中定义 browserslist
		//postcss-loader 对样式进行兼容性处理
		//要放在 css-loader less-loader 之间
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
		filename:"js/built.js",
		path:resolve(__dirname,"dist")
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
					先执行 eslint 再执行 babel，
				enforce:'pre', 处理同一个文件 优先执行此 loader;也防止了冲突
			*/
			
			{
				//在package.json中 eslintConfig -- 使用 airbnb 规则
				test:/\.js$/,
				//优先执行
				enforce:'pre',
				exclude:/node_modules/,
				//js 语法检查
				loader:'eslint-loader',
				options:{
					//检出 js 代码出错时，配置此项能帮助我们自动修复此问题
					fix:true
				}
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				// js 兼容性处理
				loader:'babel-loader',
				options:{//兼容性具体规则 
					presets:[
						[
							'@babel/preset-env',//简单的js 基本兼容性处理
							{
								useBuilt:'usage',//实现按需加载，实现所有js 的兼容性处理
								corejs:{version:3},// 兼容版本
								targets:{//兼容浏览器
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
				options:{//配置，性能优化
					limit:8*1024,//小于此大小的图片进行处理
					name:'[hash:10].[ext]',//输出文件名
					outputPath:'imgs',//指定输出路径
					esModule:false,//使用 html-loader 时一定设置此值为 false
				}
			},
			{
				// 专门处理 html 中的图片问题
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				//排除法，处理其他文件
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
				//压缩html中的空格
				collapseWhitespace:true,
				//去除html中的注释
				removeComments:true
			}
		}),
	],
	//生产模式
	//mode:"production" 时 js 自动压缩
	mode:"production"
}