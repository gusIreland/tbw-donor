// Authors: Avia Weinstein (aweinste), Dylan Corwin (dcorwin), Gus Ireland (aireland)

var express = require("express");
var app = express(); 
var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;
var optionsWithEnableWriteAccess = { w: 1 };

var dbName = 'db';
var fs = require("fs");

app.use(express.bodyParser());
app.use(express.static(__dirname + '/static/'));

app.listen(5555, function(){
	console.log("Express server listening on port " + 5555);
});

app.post("/create", function(request, response) {
  var groupID = request.body.auth.group.id;
  var user = request.body.auth.user;
  var list = request.body.list;
  createDBEntry(list);
  response.send({
    wallPosts: groupWallPosts,
    success: true
  });
});

function createDBEntry(list){
	for(var i = 0; i < list.length; i++){
		for(var j = 0; j < list[0].length; i++){
		list[i][j];
		tempObject = {'': v1};
		}
	}
	insertDocuments(objectList, dbName)
}



var client = new mongo.Db(
	dbName,
	new mongo.Server(host, port),
	optionsWithEnableWriteAccess
	);

function openDb(onOpen){
	client.open(onDbReady);

	function onDbReady(error){
		if (error)
			throw error;
		client.collection('donations', onTestCollectionReady);
	}

	function onTestCollectionReady(error, testCollection){
		if (error)
			throw error;

		onOpen(testCollection);
	}
}

function closeDb(){
	client.close();
}

function insertDocuments(collection, docs, done){
	if (docs.length === 0){
		done(null);
		return;
	}
    var docHead = docs.shift(); //shift removes first element from docs
    collection.insert(docHead, function onInserted(err){
    	if (err){
    		done(err);
    		return;
    	}
    	insertDocuments(collection, docs, done);
    });
}
