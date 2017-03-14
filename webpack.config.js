/**
 * Created by kepeng on 17/3/13.
 */

var path = require('path');
// var StringReplacePlugin = require("string-replace-webpack-plugin")
var webpack = require("webpack");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin("static/css/[name].[hash].css");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var getPublibPath = function(){
	var res;
	switch (process.env.NODE_ENV) {
	    case 'dev':
	        res = '/'
	        break
	    case 'test':
	        res = '/'
	        break
	    case 'production':
	        res = 'https://fr-static.huangbaoche.com/hbc-act/'
	        break
	    default:
	        res = '/'
	}
	console.log(res);
	return res;
}
module.exports = {
	entry: {
		'index': './src/static/index/index.js'
	},
	output: {
		filename: 'static/js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: getPublibPath()
	},
	module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }

            }, {
                test: /\.css$/,
                loader: extractCSS.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader!postcss-loader',
                })

            }, {
                test: /\.scss$/,
                loader: extractCSS.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader!postcss-loader!sass-loader'
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2192,
                        name: path.posix.join('static','img/[name].[hash:16].[ext]')
                    }
                }]
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static','fonts/[name].[hash:7].[ext]')
                    }
                }]
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.tpl$/,
                loader: "string-loader"
            }

        ]
    },
    // postcss: function() {
    //     return [precss, autoprefixer({ browsers: ['>0%'] })];
    // },
    plugins: [
	    extractCSS,
	    new CleanWebpackPlugin(['dist/app','dist/static']),
    	new HtmlWebpackPlugin({
    	    title: 'Webpack-demos',
    	    filename: 'app/index.html',
    	    hash: false,
    	    inject: true,
    	    // favicon: 'favicon.ico',
    	    // minify: compres,
    	    template: 'src/views/index/index.html',
    	    chunks: ['index']
    	}),
    ],
    devServer: {
        contentBase: './dist/',
        host: 'localhost',
        // port: 9090,
        inline: true,
        hot: true,
    }
}