var queuehandler = require("./queuehandler2.js");

function cb(err, response)
{
	console.log(response);
}


queuehandler.user.create("testuser1","testpwd1", "11-21-2015",cb);

queuehandler.user.create("testuser2","testpwd1", "11-21-2015",cb);
