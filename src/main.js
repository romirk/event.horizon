var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var http = require('http');


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var testdb = db.db("testdb");
  testdb.collection("users").find({}, function(err, result) {
    if (err) throw err;
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World!\n<br>'+result.name);
    }).listen(8080);
    console.log(result.name);
    db.close();
  });
});
