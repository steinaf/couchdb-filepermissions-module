var nano = require('nano')('http://admin:admin@localhost:5984');
var blah = nano.db.use('gibbertest');

function user_obj()
{
	this.create = User_Create;
	this.destroy = User_Destroy;
	this.checkinfo = User_CheckInfo;
	this.changepassword = User_ChangePassword;
}

function group_obj()
{
	this.create = Group_Create;
	this.destroy = Group_Destroy;
}

function file_obj()
{
	this.publish = File_Publish;
	this.edit = File_Edit;
}

var user = new user_obj();
var group = new group_obj();
var file = new file_obj();

function User_Create(username,password,date,cb)
{
	blah.insert({"type": "user","password": password,"joinDate": date,"website": "","affiliation": "","email": "","following": [],"friends": []}, username, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
}

function User_CheckInfo(username,cb)
{
	blah.get(username, { revs_info: true }, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(body);
}
});
}


function User_ChangePassword(username,newpwd)
{
	var newbody = {"type": "user","password": "","joinDate": "","website": "","affiliation": "","email": "","following": [],"friends": []};
	blah.get(username, { revs_info: true }, function(err, body) {
	if (!err)
    {	
		console.log(body);
		newbody = body;
		newbody["password"] = newpwd;
	console.log(newbody);
	blah.insert(newbody, username, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
    }
});
	
}


function User_Destroy(username,cb)
{
	blah.get(username, { revs_info: true }, function(err, body) {
	if (!err)
    {	
		console.log(body);
		
	console.log(body._rev);
	blah.destroy(username, body._rev, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
    }
});
	
}

function File_Publish(username,filename,text,date,cb)
{
	blah.insert({type: "publication", "author": username, "readaccess":[username],"writeaccess":[username],"groupreadaccess":[],"groupwriteaccess":[],"publicationDate":date,"text":text}, "gibbertest/publications/"+username+filename, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
}

function File_Edit(filename,newtext,cb)
{
	var newfile = {type: "publication", "author": "", "readaccess":"","writeaccess":"","groupreadaccess":[],"groupwriteaccess":[],"publicationDate":"","text":""};
	blah.get(filename, { revs_info: true }, function(err, body) {
	console.log(err);
	if (!err)
    {	
		console.log(body);
		newfile = body;
		newfile["text"] = newtext;
	console.log(newfile);
	blah.insert(newfile, filename, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
    }
});
	
}

function Group_Create(groupname,owner,cb)
{
	blah.insert({"owner": owner,"type": "group","members": []}, groupname, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
}

function Group_Destroy(groupname,cb)
{
	blah.get(groupname, { revs_info: true }, function(err, body) {
	if (!err)
    {	
		console.log(body);
		
	console.log(body._rev);
	blah.destroy(groupname, body._rev, function(err, body) {
  if (!err)
    {	console.log(body);
	//cb(true);
}
});
    }
});
	
}



//user.create("testuser1","testpwd1");
//user.destroy("testuser1","1-0019c0210c0d14b818d41161d2edfd31");
//group.create("testgroup1","testowner1");
file.publish("testuser1","testfile1","thisismyfiletext","21 May 2015");
file.edit("gibbertest/publications/testuser1testfile1","thisismyNEWtext");
//group.destroy("testgroup1");
//user.changepassword("testuser1","newpwd");
//user.checkinfo("testuser1");
