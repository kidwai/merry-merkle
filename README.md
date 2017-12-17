# Merry Merkle


The purpose of this project is to hold a charity fundraiser on Ethereum in which donations form a merkle tree. This tree can then be visualized in a simple web app, 
or realized in a tree with programmable lights.


*** 

### Development



```
$ git clone https://github.com/kidwai/merry-merkle.git
$ npm install 
```

### Todo

- [ ] Modify `js/leaderboard.js` to render leaderboard data
- [ ] Add buttons / form below canvases corresponding to the the functions in [here](contracts/CharityChallenge.sol).
- [ ] Add event listeners to update 
	- [ ] Overall statistics: total raised, next milestone, largest donation
	- [ ] Binary tree: each block, listen to the `CharityChallenge` object (available in the browser) and update the node properties to align with Donation struct obtained from the contract's `leaderboard` array.
- [ ] Scroll through sections