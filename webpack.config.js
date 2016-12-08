var webpack = require('webpack');
var path  = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


 module.exports = {
		entry: [/*'webpack/hot/dev-server',*/ path.resolve(__dirname, 'src/js/main.js')],
		output: {
			path: path.resolve(__dirname, 'dist/js'),
			filename: 'bundle.js'
		},
		module: {
		  loaders: [
		  // Extract css files
         {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
         },
		    { 
		    	test: /\.js$/,
		    	     exclude: /(node_modules|bower_components)/,
		    	     loader: 'babel-loader',
		    	     query: {
		    	       presets: ['es2015']
		    	     }
		    },
		    { 
		    	test: /\.png$/, 
		    	loader: 'url-loader?limit=100000' 
		    },
		    { 
		    	test: /\.jpg$/, 
		    	loader: 'file-loader' 
		    }
		  ]
		},
		resolve: {
			extensions: ['', '.js', '.json', '.jsx', '.css'],
			modulesDirectories: [
			          'node_modules'
			] 
		},
		plugins:[
		  new webpack.DefinePlugin({
		    'process.env':{
		      'NODE_ENV': JSON.stringify('production')
		    }
		  }),
		  new webpack.optimize.UglifyJsPlugin({
		    compress:{
		      warnings: true
		    }
		  }),
		  new ExtractTextPlugin('style.css')
		]
	}



