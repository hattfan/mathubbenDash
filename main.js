var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
//Store all JS and CSS in Scripts folder.


app.get('/', function (req, res) {
	res.render('indexDB.ejs');
});

app.get('/db', function (req, res) {
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');
		if (err) throw err;
		db.collection("dashtest2").find({'Typ':'Bröd'}).toArray(function (err, data) {
		// db.collection("dashtest").find({}).toArray(function (err, data) {
			
			// console.log(data)
			// var merged = [].concat.apply([], data);
			// res.json(merged)
			res.json(data)
			
		})
	})
});

var portSettings = 3030;

app.listen(portSettings, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + portSettings;
	console.log(appConsoleMsg);
});