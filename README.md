# Merry Merkle


The purpose of this project is to hold a charity fundraiser on Ethereum in which donations form a merkle tree. This tree can then be visualized in a simple web app, 
or realized in a tree with programmable lights.


*** 

### Structure


```
├── app.js 						-- just some things to pull in with webpack
├── bin							-- for scripts  
├── contracts
│   └── MerryMerkle.sol 		-- merkle tree charity contract
├── lib
│   ├── charities.json  		-- a list of charities that accept bitcoin. need to update this.
│   ├── etherscan.js  			-- an etherscan listener module
│   └── utils.js 				-- some other functions
├── LICENSE
├── package.json
├── package-lock.json
├── public 						-- web stuffs
│   ├── dist 						- webpack dump
│   ├── index.html 					- single page app 
│   └── js 							- scripts
├── README.md
└── webpack.config.js
```

### Todo


* Define donation buttons and metamask triggers
* Update listener to listen for `Donation` events from `MerryMerkle` contract
* .. 

