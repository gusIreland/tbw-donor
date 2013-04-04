// Authors: Avia Weinstein (aweinste), Dylan Corwin (dcorwin), Gus Ireland (aireland)

var express = require("express");
var app = express(); 

var fs = require("fs");

app.use(express.bodyParser());
app.use(express.static(__dirname + '/static/'));

app.listen(5555, function(){
  console.log("Express server listening on port " + 5555);
});