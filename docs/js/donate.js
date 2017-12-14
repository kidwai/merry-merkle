
var contents = charities;
var categories = {
	bitcoin: [],
	ethereum: [],
	paypal: []
};






var color = function (str) {
	return d3.scaleOrdinal(d3.schemeCategory20)(categories[str]);
}




function bitcoin () {
	update(contents.filter(content => typeof content.payment.bitcoin !== 'undefined'));
}

function ethereum () {
	update (contents.filter(content => typeof content.payment.ethereum !== 'undefined'));
}


function paypal () {
	update( contents.filter(content => typeof content.payment.paypal !== 'undefined'));
}



function updateCharities(list) {
	if (!list) return;
	$("#cards").html('<div id="cards" class="ui link cards"></div>');
		list.forEach(function (info) {
		var bottom_color;
			if (typeof info.payment.bitcoin !== 'undefined') 
				bottom_color = "red";
			else if (typeof info.payment.ethereum !== 'undefined')
				bottom_color = "blue";
			else
				bottom_color = "purple";
			

			console.log(bottom_color);
			$('#cards').append(
				`<div class="${bottom_color} card">
				<div class="meta">
				<span class="data">${Object.keys(info.payment).join(',')}</span>
				</div>
				<div class="content">
				<a href="${info.url}" class="header">${info.name}</a>
				<br/>
				<div class="meta">
				<span class="date">Author: ${info.author}</span>
				</div>
				</div>
				</div>`
			);        
		});
	}

	function update (n) {
		updateTree(contents);
		updateCharities(contents);
		setTimeout(update, n, n);
	}

	    $(document).ready(function() {

	    	regenerate(true);
	    	update(15000);
	    });
