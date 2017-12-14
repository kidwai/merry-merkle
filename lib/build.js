var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var config = require('../config');
var Web3 = require('web3');
var web3 = new Web3(); 
var dir = path.resolve('contracts');

module.exports = function () {
	var files = fs.readdirSync(dir)
				  .map(item => `${dir}/${item}`)
				  .join(' ');

	var output = cp.execSync(`solc --combined-json abi,bin ${files} > /tmp/contracts.json`).toString('utf-8');

	var contracts = require('/tmp/contracts.json').contracts;

	var out = {};

	for (var key in contracts) {

		var contractName = key.split(':').slice(-1)[0];
		out[contractName] = {
			abi: JSON.parse(contracts[key].abi),
			bin: contracts[key].bin,
			instance: undefined
		}


		if (contractName in config.contracts) 
			out[contractName].instance = config.contracts[contractName];
		
	}

	return out;
}