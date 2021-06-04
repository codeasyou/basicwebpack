//此课程已完结

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
	],
	mode:"production",
	externals:{
		//忽略库名  --npm 包名
		// 拒绝 jquey 包被打包。拒绝某些包被打包，如 react ....
		// 此时 要在 index.html 手动引入，否则会报错
		jquery:"jQuery"
	}
};
