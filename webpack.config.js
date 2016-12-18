'use strict';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION_PATH = '/dist';
var SRC_PATH  = 'src';
var BUILD_PATH = 'build';
var ENV = 'development'; // Or 'porduction'
var devURL = 'http://localhost:9999/';

var jsxLoader = (ENV === 'development') ? 'react-hot!babel' : 'babel';

function getEntrySources(sources) {
  if(ENV === 'development') {
    sources.push('webpack-dev-server/client?' + devURL);
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

var configuration = {
  entry: { main: getEntrySources(['./src/js/main']),
      vendor: [
         'react',
         'react-dom'
      ]
   },
  // devtool: ['cheap-source-map'],
  output: {
    publicPath: devURL,
    // path: PRODUCTION_PATH,
    filename: 'dist/js/[name].js',
    // chunkFilename: 'js/[id].js'
  },
  module: {
    loaders: [
		  // Extract css files
      // {
      //   test: /\.css$/,
      //   // loader: 'style-loader!css-loader',
      //   loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      //    },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap&sourceMapContents&outputStyle=expanded']
        // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap&sourceMapContents')
         },
      {
        test: /(\.js(x)?)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
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
  devServer: {
  	port: 9999,
  	// compression: true,
  	devtool: '#cheap-module-eval-source-map',
    progress: true,
    colors: true,
    hot: true,
    // contentBase: './dist',
    'proxy': {
      '/api/products': {
        target: 'https://campaigns.she.com/xmas2016/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss'],
    modulesDirectories: [
			          'node_modules'
			]
  },
  // plugins: [
  //     // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
	// 	  new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify(ENV)
  //     }
  //   }),
	// 	  new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     },
  //     // sourceMap: false
  //   }),
	// 	  new ExtractTextPlugin('css/[name].css', { allChunks: false }),
  //     new webpack.SourceMapDevToolPlugin({
  //       filename: '[file].map',
  //       exclude: ['vendor.js', 'vendor.bundle.js']
  //     }),
		//   new HtmlWebpackPlugin({
    //   title: 'My App',
    //   template: '!!pug!src/index.pug'
    // })
		// ]
};



module.exports = configuration;