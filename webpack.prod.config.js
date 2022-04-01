const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, './build'),
		publicPath: '/build/',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/,
				use: [MiniCSSExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
				use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.hbs$/,
				use: ['handlebars-loader'],
			},
		],
	},
	plugins: [
		new MiniCSSExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Test App',
			template: 'src/index.hbs',
			filename: 'index.html',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				'theme-color': '#4285f4',
				description: 'Portal fo US Today, Apple and Tesla News',
			},
		}),
	],
};
