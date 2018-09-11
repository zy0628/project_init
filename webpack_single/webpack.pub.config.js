const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
//删除文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin');
//压缩js
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
//抽离css
const miniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩css
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
				use: [
						{
							loader: miniCssExtractPlugin.loader,
							options: {
								publicPath: '../'
							}
						},
						'css-loader'
				]
			},{
				test: /\.scss$/,
				use: [
						{
							loader: miniCssExtractPlugin.loader,
							options: {
								publicPath: '../'
							}
						},
						'css-loader','sass-loader'
				]
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
		}),
		new cleanWebpackPlugin(['dist']),
		new miniCssExtractPlugin({
			filename: '[name]-[contenthash].[ext]',
			chunkFilename: "[id].[ext]"
		}),
		new optimizeCssAssetsPlugin()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				dafault: false,
				commons: {
					chunks: 'initial',
					name: 'commons',
					minChunks: 2
				},
				vendors: {
					test: /node_modules/
				},
				styles: {
					name: 'styles',
					test: /\.(sa|sc|c)ss$/,
					chunks: 'all',
					enforce: true
				}
			}
		},
		minimizer: [
			new uglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					warnings: false,
					output: {
						comments: false,
						beautify: false
					}
				}
			})
		],
		nodeEnv: "production"
	}
}