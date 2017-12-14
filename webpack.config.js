var path = require('path');
var fs = require('fs');

module.exports = {
	entry: './app.js',
	output: {
		path: __dirname,
		filename: './public/dist/app.bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: "json-loader", exclude: /node_modules/}
		]
	}
}
