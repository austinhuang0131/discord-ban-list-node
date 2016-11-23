var rest = require('rest');
var list = [];
var result = false;

module.exports = function(query) {
	rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
		var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
		if (templist.length === 0) {
			return "Failed to ping the Ban List.";
		}
		templist.forEach(function(item, index){
			if(!isNaN(Number(item))){
				list.push(String(Number(item)));
			}
		});
	});
 	if (list.indexOf(query) > -1) {result = true;}
	return result;
};
