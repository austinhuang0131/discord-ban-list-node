var request = require('request');
var list = [];
var result = false;

module.exports = function test(query) {
    return new Promise((resolve, reject) => {
    	request('http://discord.shoutwiki.com/w/api.php?action=query&titles=Ban%20List&prop=revisions&rvlimit=1&rvprop=content&format=json', function(error, response, body) {
        	if (error || response.statusCode !== 200) {
        		return "Failed to ping the Ban List.";
        	}
        	body = JSON.parse(body);
        	var w = body.query.pages;
        	var body1 = w[Object.keys(w)[0]].revisions[0];
        	var templist = body1[Object.keys(body1)[2]].split("{| class='wikitable'\n|-\n! Username\n! User ID\n! Action\n! Proof\n")[1].split('\n|');
        	if (templist.length === 0) {
        		return reject("Failed to ping the Ban List.");
        	}
        	templist.forEach(function(entry) {
        		if (entry.startsWith(" ")) {
        			var stuff = entry.split(" ")[1];
        			if (!isNaN(Number(stuff))) {
        				list.push(stuff);
        			}
        		}
        	});
        	if (list.indexOf(query) > -1) {result = true;}
            if (result = false) {
                request('https://bans.discordlist.net/api', function(error, response, body) {
                    if (error || response.statusCode !== 200) {
                        return "Failed to ping the Ban List.";
                    }
                    body = JSON.parse(body);
                    if (body.length === 0) {
                        return reject("Failed to ping the Ban List.");
                    }
                    body.forEach(function(entry) {
                        list.push(entry[0]);
                    });
                    if (list.indexOf(query) > -1) {result = true;}
                })
            }
        	return resolve(result);
        });
    });
};


//example on how to use it
/**
 * 
 *  var dbl = require("discord-ban-list");
    dbl("1234567890").then(isBanned => {
       console.log(isBanned);
       //return true or false
    }).catch(console.log);
 * 
 **/

module.exports.wiki = function test(query) {
    return new Promise((resolve, reject) => {
    	request('http://discord.shoutwiki.com/w/api.php?action=query&titles=Ban%20List&prop=revisions&rvlimit=1&rvprop=content&format=json', function(error, response, body) {
        	if (error || response.statusCode !== 200) {
        		return "Failed to ping the Ban List.";
        	}
        	body = JSON.parse(body);
        	var w = body.query.pages;
        	var body1 = w[Object.keys(w)[0]].revisions[0];
        	var templist = body1[Object.keys(body1)[2]].split("{| class='wikitable'\n|-\n! Username\n! User ID\n! Action\n! Proof\n")[1].split('\n|');
        	if (templist.length === 0) {
        		return reject("Failed to ping the Ban List.");
        	}
        	templist.forEach(function(entry) {
        		if (entry.startsWith(" ")) {
        			var stuff = entry.split(" ")[1];
        			if (!isNaN(Number(stuff))) {
        				list.push(stuff);
        			}
        		}
        	});
        	if (list.indexOf(query) > -1) {result = true;}
        	return resolve(result);
        });
    });
};

module.exports.list = function test(query) {
    return new Promise((resolve, reject) => {
        request('https://bans.discordlist.net/api', function(error, response, body) {
            if (error || response.statusCode !== 200) {
                return "Failed to ping the Ban List.";
            }
            body = JSON.parse(body);
            if (body.length === 0) {
                return reject("Failed to ping the Ban List.");
            }
            body.forEach(function(entry) {
                list.push(entry[0]);
            });
            if (list.indexOf(query) > -1) {result = true;}
            return resolve(result);
        });
    });
};
