var Web3 = require('web3');
var build = require('../lib/build')();
var fs = require('fs');
var config = require('../config');
var etherscan = require('./etherscan');
var eth = new Web3(new Web3.providers.HttpProvider(config.networks[config.network].host)).eth;


module.exports = function (duration) {
    var duration = duration || 500;
    return new Promise ((resolve, reject) => {
        etherscan.getPrice().then((price) => {
        var factory = eth.contract(build.CharityChallenge.abi);
        factory.new("0x78f47F9E7088F8b55145248C8D3Efd9451acEc47".toLowerCase(), price, duration,
				{from: eth.accounts[0], gas: 90000000, data: '0x' + build.CharityChallenge.bin},
	      function (err, contract) {
		if (!err) {
			if (!contract.address) console.log(`transaction sent: ${contract.transactionHash}`);
			else {
				console.log(`transaction mined: ${contract.address}$`);
				config.networks[config.network].contracts.CharityChallenge = contract.address;
				fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
				resolve(contract);
			}
		} else {console.log(`error: ${err}`)};
	       }
         ); });
    });
}
