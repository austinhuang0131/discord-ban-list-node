var request = require('request');
var result = false;
var list = [];

request('http://discord.shoutwiki.com/w/api.php?action=query&titles=Ban%20List&prop=revisions&rvlimit=1&rvprop=content&format=json', function(error, response, body) {
	if (error || response.statusCode !== 200) {
		return "Failed to ping the Ban List.";
	}
	body = JSON.parse(body);
	var w = body.query.pages;
	var body1 = w[Object.keys(w)[0]].revisions[0];
	var templist = body1[Object.keys(body1)[2]].split("{| class='wikitable'\n|-\n! Username\n! User ID\n! Action\n! Proof\n")[1].split('\n|');
	if (templist.length === 0) {
		return "Failed to ping the Ban List.";
	}
	templist.forEach(function(entry) {
		if (entry.startsWith(" ")) {
			var stuff = entry.split(" ")[1];
			if (!isNaN(Number(stuff))) {
				list.push(stuff);
			}
		}
	});
});

module.exports = function(query) {
	if (list.indexOf(query) > -1) {result = true;}
	return result;
};