const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const clientPath = path.join(__dirname, '/src/browser/index.js');
const serverPath = path.join(__dirname, '/src/server/index.js');

const clientConfig = {
	entry: clientPath,
	output: {
		path: __dirname,
		filename: "./public/bundle.js"
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: "file-loader",
				options:{
					name: "public/media/[name].[ext]",
					publicPath: url => url.replace(/public/, '')
				}
			},
			{
				test: /\.css$/,
				use:ExtractTextPlugin.extract({
					use:[
						{
							loader: 'css-loader',
							options:{importLoaders:1}
						},
						{
							loader: 'postcss-loader',
							options:{plugins:[autoprefixer()]}
						},
					]
				})
			},
			{
				test: /\.scss$/,
				use:ExtractTextPlugin.extract({
					use:[
						{
							loader: 'css-loader',
							options:{importLoaders:1}
						},
						{
							loader: 'postcss-loader',
							options:{plugins:[autoprefixer()]}
						},
						{
							loader: 'sass-loader',
							options:{plugins:[autoprefixer()]}
						},
					]
				})
			},
			{
				test: /js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {presets: ["react-app"]}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "public/css/[name].css"
		}),
		new CleanWebpackPlugin([ 'public/css/', 'public/media/' ], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
};

const serverConfig = {
	entry: serverPath,
	target: "node",
	output: {
		path: __dirname,
		filename: "server.js",
		libraryTarget: "commonjs2"
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: "file-loader",
				options:{
					name: "public/media/[name].[ext]",
					publicPath: url => url.replace(/public/, ''),
					emit: false
				}
			},
			{
				test: /css$/,
				use:[{
					loader: "css-loader/locals"
				}]
			},
			{
				test: /js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {presets: ["react-app"]}
			}
		]
	}
};

module.exports = [clientConfig, serverConfig];