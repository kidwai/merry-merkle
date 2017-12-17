var Web3 = require('web3');
var build = require('../lib/build')();
var deploy = require('../lib/deploy');
var fs = require('fs');
var config = require('../config');
var network = require('../lib/networks')[config.network];

deploy().then((contract) => {
    donate(contract);
    challenge(contract);
});




function donate(contract) {
   for (var i = 0 ; i < eth.accounts.length; i++) {
	network.eth.sendTransaction({from: eth.accounts[0], to: contract.address, value: 100000*i + 94*i});
   }
}


function challenge(contract) {
     for (var i = 0 ; i < 100; i++ ) {
	contract.challenge(i, "lol" , [0,255,255], {
		from: contract._eth.accounts[i], gas: 900000000, value: 1000000
	});
     }
}
