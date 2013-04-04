// Authors: Avia Weinstein (aweinste), Dylan Corwin (dcorwin), Gus Ireland (aireland)

var express = require("express");
var app = express(); 
var fs = require("fs");

var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;

var optionsWithEnableWriteAccess = { w: 1 };
var dbName = 'testDb';

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
        client.collection('testCollection', onTestCollectionReady);
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

app.use(express.bodyParser());
app.use(express.static(__dirname + '/static/'));


app.post("/create", function(request, response) {
  var list = request.body.files;
  createDBEntry(list);
  response.send({
    success: true
  });
});

function createDBEntry(list){
	var objectList = new Array();
	for(var i = 1; i < list.length; i++){
		name = list[i][1];
		tempObject = {'name': name};
		objectList.push(tempObject);
	}
	insertDocuments(donations, objectList)
}




app.listen(5555, function(){
	console.log("Express server listening on port " + 5555);
});
