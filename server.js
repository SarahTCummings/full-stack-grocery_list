var express = require("express");
var app = express();
var inMemoryDatabase = require("./in-memory-database");
var db = inMemoryDatabase();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var items = [
  {name: "Fish", price: 20 },
  { name: "Carrots", price: 2.50 }
];

db.init(items);

// respond with "Hello World!" on the homepage
app.get("/api/items", function (req, res) {
  res.send(db.readAll());
});

app.get("/api/items/:id", function (req, res) {
  var id= req.params.id;
  console.log(id);
  res.send(db.read(id));
});

app.post("/api/items", function (req, res) {
  db.create(req.body);
  res.send("OK");
});

app.delete("/api/items/:id", function(req, res) {
        var id = req.params.id;
        db.delete(id);
        res.send("delete");
    });


var server = app.listen(5000, function () {
  var port = server.address().port;
  console.log("App's server listening at http://localhost:%s", port);
});
