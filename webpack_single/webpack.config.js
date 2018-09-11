const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

export default {
	entry: path.join(__dirname,'src/main.js'),
	output: {
		path: path.join(__dirname,'dist'),
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},{
				test: /\.scss$/,
				use: ['style-loader','css-loader','sass-loader']
			},{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},{
				test: /\.(png|gif|jpg|bmp|ttf|eot|svg|woff)$/,
				use: 'url-loader?limit=7000'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname,'src/index.html'),
			filename: 'index.html'
		})
	]
}