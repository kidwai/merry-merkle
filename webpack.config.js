var path = require('path');
var fs = require('fs');

module.exports = {
	entry: './app.js',
	output: {
		path: __dirname,
		filename: './docs/dist/app.bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: "json-loader", exclude: /node_modules/}
		]
	}
}
