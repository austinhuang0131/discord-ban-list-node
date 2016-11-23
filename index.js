var rest = require('rest');
var list = [];
var result = false;

module.exports = function(query) {
  rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
		var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
		if (templist.length === 0) {
			console.log(cWarn("WARN")+" Failed to ping Ban List.");
			return;
		}
		templist.forEach(function(item, index){
			if(!isNaN(Number(item))){
				list.push(String(Number(item)));
			}
		});
		fs.writeFile("./Metagon/Metagon/config/banlist.json", list);
	});
  if (list.indexOf(query) > -1) {result = true;}
  return result;
};
