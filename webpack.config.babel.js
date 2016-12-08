import webpack from 'webpack';
export default {
	modules: {
		entry: 'src/js/main.jsx',
		output: {
			path: './dist/js',
			filename: 'bundle.js'
		},
		module: {
		  loaders: [
		    { 
		    	test: /\.js$/,
		    	     exclude: /(node_modules|bower_components)/,
		    	     loader: 'babel-loader',
		    	     query: {
		    	       presets: ['es2015']
		    	     }
		    } 
		  ]
		},
		resolve: {
			extensions: ['', '.js', '.json']
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
		  })
		]
	}

}


