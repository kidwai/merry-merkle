


function getLeaderBoard () {
	var leaderboard = [];
	for (var i = 0 ; i < 50; i++) {
		leaderboard.push(CharityChallenge.leaderboard(i));
	}

	return leaderboard;
}

function rendertree () {

var width = 960,
    height = 500,
    radius = 6;

var fill = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#leadertree")
    .attr("width", width)
    .attr("height", height);



    json = {
  "nodes": [
    {"name": "d3"},
    {"name": "d3.svg"},
    {"name": "d3.svg.area"},
    {"name": "d3.svg.line"},
    {"name": "d3.scale"},
    {"name": "d3.scale.linear"},
    {"name": "d3.scale.ordinal"}
  ],
  "links": [
    {"source": 0, "target": 1},
    {"source": 1, "target": 2},
    {"source": 1, "target": 3},
    {"source": 0, "target": 4},
    {"source": 4, "target": 5},
    {"source": 4, "target": 6}
  ]
}

  var link = svg.selectAll("line")
      .data(json.links)
    .enter().append("line");

  var node = svg.selectAll("circle")
      .data(json.nodes)
    .enter().append("circle")
      .attr("r", radius - .75)
      .style("fill", function(d) { return fill(d.group); })
      .style("stroke", function(d) { return d3.rgb(fill(d.group)).darker(); })
      .call(force.drag);

  force
      .nodes(json.nodes)
      .links(json.links)
      .on("tick", tick)
      .start();

  function tick(e) {
    var k = 6 * e.alpha;

    // Push sources up and targets down to form a weak tree.
    link
        .each(function(d) { d.source.y -= k, d.target.y += k; })
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  
}
}