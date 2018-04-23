var MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  var db = client.db('dabas');
  if (err) throw err;
	db.collection("dashtest").find().toArray(function(err, data) {
    
  })
})