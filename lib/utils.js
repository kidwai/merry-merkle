/**
  * @namespace utils
**/

const https = require('https');

/**
  *
  * Gets a json object from the requested URL  over https
  *
  * @param  {string}  url   - The url, with or without the querystring arguments
  * @param  {object}  [params]  - Parameters to add to a querystring following the url
  * @param  {function} [formatter] - A formatter function to apply to the JSON response
  *
  * @returns {Promise}  A promise wrapped around the JSON response
**/

exports.getJSON = function (url, params, formatter) {
	var params = params || {};
	return new Promise (function (resolve, reject) {
		Object.keys(params).forEach(function (key) {
			url += `&${key}=${params[key]}`;
		})
		https.get(url, (res) => {
			var data = '';
			res.on('data', (d) => {
				data += d.toString();
			});

			res.on('end', () => {
				var result = JSON.parse(data).result;
				if (typeof formatter === 'function') {
					result = formatter(result);
				}
				resolve(result);
			});
		}).on('error', (e) => {
			console.error('error: ', e);
			reject(e);
		})
	})
}

/**
  * Converts hexstrings that are to be interpreted as
  * numbers into decimal format.
  *
  * @param  {object}   block 	-   The input block
  *
  * @returns {object}  The formatted block.
**/
exports.formatBlock = function  (block) {
	block.number = Number(block.number, 16);
	block.timestamp = Number(block.timestamp, 16);
	block.difficulty = Number(block.difficulty, 16);
	block.gasLimit = Number(block.gasLimit, 16);
	block.gasUsed = Number(block.gasUsed, 16);
	block.nonce = Number(block.nonce, 16);
	block.size = Number(block.size, 16);
	block.totalDifficulty = Number(block.totalDifficulty, 16);
	block.transactions = block.transactions.map(exports.formatTransaction);
	return block;
}

// not working correctly for non-numbers
 function toDecimal (arg) {
	var T = typeof (arg);
	if (T === 'string') {
		if (arg.length < 32)
			return Number(arg, 16);
		else
			return arg
	}

	if (T === 'object') {
		if (typeof arg.length !== 'undefined') {
			return arg.map(exports.toDecimal);
		}
		else {
			var result = {};
			for (var key in arg) {
				console.log(key, arg[key])
				result[key] = exports.toDecimal(arg[key]);
			}
			return result;
		}
	}
	return arg;
}

/**
  * Converts hexstrings that are to be interpreted as
  * numbers into decimal format.
  *
  * @param  {object}   block 	-   The input transaction
  *
  * @returns {object}  The formatted transaction.
**/
exports.formatTransaction = function (tx) {
	for (var key in tx) {
		if (typeof tx[key] === 'string' && 
			tx[key].length < 32 &&
			key !== 'input' &&
			key !== 'standardV' &&
			key !== 'v') {
			if (tx[key].startsWith('0x'))
				tx[key] = Number(tx[key], 16);
			else
				tx[key] = Number(tx[key]);
		}

	}

	return tx;
}

/**
  *
  * Converts hexstrings that are to be interpreted as
  * numbers into decimal format.
  *
  * @param  {string}   hex 	-   The hexstring
  *
  * @returns {number}  The decimal number.
**/
exports.toDecimal = function (hex) {
	return Number(hex, 16);
}

/**
  * Convert wei to eth
  * @param {number} wei  - The wei to convert
  *
  * @returns {number}  The amount in eth
**/
exports.weiToEth = function (wei) {
	return 1.0*wei/Math.pow(10, 18);
}



/**
  * Convert wei to usd
  * @param {number} wei  - The wei to convert
  *
  * @returns {number}  The amount in usd
**/
exports.weiToUsd = function (wei) {
	return exports.ethToUsd(exports.weiToEth(wei));
}

/**
  * Convert eth to usd
  * @param {number} eth  - The eth to convert
  *
  * @returns {number}  The amount in usd
**/
exports.ethToUsd = function (eth) {
	return eth;
}

