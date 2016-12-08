var webpack = require('webpack');
var path  = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
		// entry: [/*'webpack/hot/dev-server',*/ path.resolve(__dirname, 'src/js/main.js')],
		entry: {main: ['./src/js/main','./src/css/main']},
		output: {
			path: path.resolve(__dirname, 'dist'),
			// filename: 'bundle.js'
			filename:'js/[name].js',
			chunkFilename: 'js/[id].js'
		},
		module: {
		  loaders: [
		  // Extract css files
         {
                test: /\.css$/,
                // loader: 'style-loader!css-loader',
                loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
         },
         // {
         //        test: /\.scss/,
         //        loader: ExtractTextPlugin.extract('style-loader', 'css!sass?indentedSyntax=true&sourceMap=true')
         // },
		    { 
		    	test: /(\.js(x)?)$/,
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
		      'NODE_ENV': JSON.stringify('development')
		    }
		  }),
		  new webpack.optimize.UglifyJsPlugin({
		    compress:{
		      warnings: true
		    }
		  }),
		  new ExtractTextPlugin('css/[name].css', {allChunks: true}),
		  new HtmlWebpackPlugin({
		  	title: 'My App',
		  	filename: '../index.html'
		  })
		]
	}



