var branches = [];
var seed = {i: 0, x: 420, y: 600, a: 0, l: 130, d:0}; // a = angle, l = length, d = depth
var da = 0.1; // Angle delta
var dl = 0.8; // Length delta (factor)
var ar = 0.7; // Randomness
var maxDepth = 10;




// Tree creation functions
function branch(b) {
	var end = endPt(b), daR, newB;
	console.log(b);
	branches.push(b);

	if (b.d === maxDepth)
		return;

	// Left branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: b.a - da + daR,
		l: b.l * dl,
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);

	// Right branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x, 
		y: end.y, 
		a: b.a + da + daR, 
		l: b.l * dl, 
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);
}

function regenerate(initialise) {
	branches = [];
	branch(seed);
	initialise ? create() : updateTree();
}

function endPt(b) {
	// Return endpoint of branch
	var x = b.x + b.l * Math.sin( b.a );
	var y = b.y - b.l * Math.cos( b.a );
	return {x: x, y: y};
}


// D3 functions
function x1(d) {return d.x;}
function y1(d) {return d.y;}
function x2(d) {return endPt(d).x;}
function y2(d) {return endPt(d).y;}

function highlightParents(d) {
	var colour = d3.event.type === 'mouseover' ? 'green' : 'red';
	var depth = d.d;
	for(var i = 0; i <= depth; i++) {
		d3.select('#id-'+ parseInt(d.i)).style('stroke', colour);
		d = branches[d.parent];
	}	
}

function create() {
	d3.select('#leadertree')
		.selectAll('line')
		.data(branches)
		.enter()
		.append('line')
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.style('stroke-width', function(d) {return parseInt(maxDepth + 0.1 - d.d) + 'px';})
		.attr('id', function(d) {return 'id-'+d.i;})
		.on('mouseover', highlightParents)
		.on('mouseout', highlightParents);
}

const addr ="0x06012c8cf97bead5deae237070f9587f8e7a266d";

const addrs = [
	'0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0',
	'0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d',
	'0x3597bfd533a99c9aa083587b074434e61eb0a258',
	'0xe41d2489571d322189246dafa5ebde1f4699f498',
	'0x55f93985431fc9304077687a35a1ba103dc1e081',
	'0x8f8221afbb33998d8584a2b05749ba73c37a938a'
]


function updateTree() {
	etherscan.filterTransactions(addr).then(function (txs) {
		$('#donors').text(txs.length);

		var t =	d3.transition()
			  .duration(750)
			  .ease(d3.easeLinear)

	d3.select('svg')
		.selectAll('line')
		.data(branches)
		.transition(t)
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.style('stroke', function (d) { return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`});
	});



}



