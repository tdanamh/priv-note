var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Privnote' });
});

router.post("/save", function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { message: JSON.stringify(req.body["content"])};
    var id = ""
    dbo.collection("messages").insertOne(myobj, function(err, data) {
      if (err) throw err;
      id = myobj._id;
      res.send(id);
      db.close();
    });
  });
});

router.get('/view/:id', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var id = req.params["id"];
  dbo.collection("messages").findOne({"_id" : ObjectId(id)}, function(err, result) {
    if (!result) {
      res.send("Your note has been read");
    } else {
      res.send(result.message);
    }
    db.close();
  });
  dbo.collection("messages").deleteMany({"_id" : ObjectId(id)}, function(err, result){
    if (err) throw err;
    db.close();
  });
});
});

module.exports = router;
