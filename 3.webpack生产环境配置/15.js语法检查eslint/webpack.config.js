
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
					语法检查：团队开发各成员间所写代码，保持风格统一。规范成员间所写代码类似。检测所写代码常见错误。
					工具：eslint
					webpack 中下载：eslint-loader eslint
					npm install eslint-loader eslint --save-dev
					注意：只检查源代码，第三方插件，第三方库不检查。
					exclude:/node_modules/
					设置检查规则：注意是在 package.json 中进行设置，而不是在项目的 webpack.config.js 中设置 ~
					package.json 中eslintConfig的设置
					"eslintConfig": {
						  "extends":"airbnb-base"
					}
					推荐使用规则 airbnb；需要三个包 eslint 、eslint-config-airbnb-base、eslint-plugin-import
					eslint-config-airbnb-base 不包含react 风格
					eslint-config-airbnb 包含react 风格
					
				*/
			   test:/\.js$/,
			   exclude:/node_modules/,//一定排除
			   loader:"eslint-loader",
			   options:{
				   //自动修复eslint的错误
				   fix:true
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