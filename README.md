```
npm install discord-ban-list
```
Use this module to check whether a certain Discord user ID has been listed in the [Ban List](http://discord.shoutwiki.com/wiki/Ban_List) or not.
```js
var dbl = require("discord-ban-list");
dbl("1234567890").then(isBanned => {
    console.log(isBanned);
}).catch(console.log);
// Returns true/false
```
