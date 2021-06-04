//此课程已完结

/**
 * 先创建 webpack.dll.js
 * webpack --config webpack.dll.js
 * 使用 add-asset-html-webpack-plugin 引入jqury...
 * 再运行 webpack
 * 
 * 作用：优化了，重复打包jquery 性能
 * 
 */


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpck = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
   entry:"./src/js/index.js",
	output:{
		filename:"js/built.js",
		path: path.resolve(__dirname, 'build'),
	},

	plugins:[
		new HtmlWebpackPlugin({
			template:"./src/index.html"
		}),

		//告诉webpack 哪些库不参与打包，使用时的名称也得变~
		new webpck.DllReferencePlugin({
			manifest:path.resolve(__dirname,"dll/manifest.json")
		}),

		//将某个文件打包输出出去，并在 html 中自动引入该资源
		new AddAssetHtmlWebpackPlugin({
			filepath:path.resolve(__dirname,'dll/jquery.js')
		}),
	],
	mode:"production",
};
