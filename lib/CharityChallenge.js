var network = require('./network');
var config = require('../config');


module.exports = network.eth.contract(config.contracts.CharityChallenge.abi)
					 .at(config.networks[config.network].contracts.CharityChallenge);