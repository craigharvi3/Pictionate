/**

	Webpack config

*/
var path = require('path');
var webpack = require('webpack');


module.exports = {

	// This is our entry points for building files
	// Key value object, key is the file name, value is the file we build from
	entry: './src/js/index.js',

	// The output name of our files is the key of the entry object from above ^
	output: {
		path: __dirname + '/',
		filename: 'pictionate.js'
	},

	stats: {
		// Configure the console output
		colors: true,
		reasons: true
	},

	progress: false, // Don't show progress

	failOnError: true,

	watch: false, // use webpacks watcher

	keepalive: false, // don't finish the task

	inline: true,  // embed the webpack-dev-server runtime into the bundle
	// Defaults to false

	devtool: 'source-map',

	module: {
		loaders: [ //Babel loader - gives us native ES6 support
			{
				test: /\.jsx?$/,
				exclude: [/(node_modules)/],
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				include: /\.json$/, loaders: ["json-loader"]
			}
		],
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: [
					/(node_modules)/,
					/(extlibs)/,
					/(plugins)/
				],
				loader: 'eslint-loader'
			}
		]
	},

	eslint: {
		configFile: './configs/.eslintrc.json',
		fix: true
	},

	resolve : {
		root: [
			path.resolve('./src/js/')
		],
		extensions: ['', '.json', '.jsx', '.js']
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
			// (Modules must be shared between a minimum 2 entries)
			minChunks: 2,
		})
	]
}
