var Web3 = require('web3');
var config = require('../config');

module.exports = new Web3(new Web3.providers.HttpProvider(config.networks[config.network].host));