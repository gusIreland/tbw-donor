// Authors: Avia Weinstein (aweinste), Dylan Corwin (dcorwin), Gus Ireland (aireland)

var express = require("express");
var app = express(); 
var coll;
var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;
var nameList;
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
        client.collection('donations', onCollectionReady);
    }

    function onCollectionReady(error, collection){
        if (error)
            throw error;
        onOpen(collection);
        // remove everything from the collection.
        /*collection.remove({}, function(error){
            if (error)
                throw error;
            onOpen(collection);
        });*/

    }
}

function closeDb(){
    client.close();
}

openDb(onDbOpen);

function onDbOpen(collection){
    // set coll to be the collection so that we have access to it later
    coll = collection;
}

function onDocumentsInserted(err){
    if (err)
        throw err;
    console.log('documents inserted!');
//    closeDb();
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


//Ok, I am bad at closures, I want to find out how to return all without using a global. Because globals are bad

function createDBEntry(list){
    var objectList = new Array();
    for(var i = 0; i < list.length; i++){
        name = list[i][1];
        email = list[i][15];
        tempObject = {'name': name, 'email': email, unique: true};
        objectList.push(tempObject);
    }
    console.log(objectList);

    insertDocuments(coll, objectList, onDocumentsInserted)
}

app.use(express.bodyParser());

app.post("/create", function(request, response) {
   // openDb(onDbOpen);
    var list = request.body.files;
    createDBEntry(list);
    response.send({
    success: true
  });
});

app.get("/create", function(request, response) { 
    
    coll.find({}).toArray(function(err, doc){
    if (err)
        throw error;
    //console.log(doc);
    response.send({
    list: doc,
    success: true
  });
    });
});

app.delete("/create/:id", function(request, response){
//var objID = ObjectId.createFromHexString(request.params.id);
var query = { name:  request.params.id};
console.log(query);
coll.remove(query, function logResult(error, numberDocsRemoved){
    if (error)
        throw error;
    console.log(numberDocsRemoved)
});

  response.send({
    success: true
  });
});


app.use(express.static(__dirname + '/static/'));
app.listen(5555, function(){
	console.log("Express server listening on port " + 5555);
});
