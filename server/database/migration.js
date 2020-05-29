var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("rem");

  //Templates table
  dbo.createCollection("templates", function(err, res) {
    if (err) throw err;
    console.log("Collection templates created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("rem");

  //Servers table
  dbo.createCollection("servers", function(err, res) {
    if (err) throw err;
    console.log("Collection servers created!");
    db.close();
  });
});
