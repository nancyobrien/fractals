'use strict';
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8080';

loaders.push({
	test: /\.scss$/,
	loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
	exclude: ['node_modules']
})

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/index.js',
  	],
  	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
  	},
	resolve: {
		extensions: ['.js', '.jsx'],
		//Allow locating dependancies relative to the src directory and then the js directory
		//avoid .. hell
		modules: [
			path.join(__dirname, '/src'),
			path.join(__dirname, '/src/js'),
			'node_modules'
		],
		alias: {
			symbol: 'es6-symbol',
			'~': path.join(__dirname, '/src')
		}
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: './public',
		//do not print bundle build state
		noInfo: true,
		//embed the webpack-dev-server runtime into the bundle
		inline: true,
		//serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			files: {
				css: ['style.css'],
				js: ['bundle.js']
			}
		})
	]
};