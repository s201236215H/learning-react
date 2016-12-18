'use strict';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION_PATH = 'dist';
var SRC_PATH  = 'src';
var BUILD_PATH = 'build';
var ENV = 'development'; // Or 'porduction'

var jsxLoader = (ENV === 'development') ? 'react-hot!babel' : 'babel';

var configuration = {
  entry: { main: [path.resolve(__dirname, SRC_PATH + '/js/main')],
      vendor: [
         'react',
         'react-dom'
      ]
   },
  devtool: ['cheap-source-map'],
  output: {
    path: PRODUCTION_PATH,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  module: {
    loaders: [
		  // Extract css files
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader',
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
         },
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!sass?indentedSyntax=false&sourceMap=true')
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap&sourceMapContents')
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
  	compression: true,
  	devtool: '#cheap-module-source-map',
    progress: true,
    color: true,
    hot: true,
    contentBase: './dist',
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
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		  new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
		  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      // sourceMap: false
    }),
		  new ExtractTextPlugin('css/[name].css', { allChunks: false }),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: ['vendor.js', 'vendor.bundle.js']
      }),
		  new HtmlWebpackPlugin({
      title: 'My App',
      template: '!!pug!src/index.pug'
    })
		]
};

if (ENV === 'development') {
    configuration.entry.main.unshift(
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true'
    );
    configuration.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = configuration;