var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';
app.post('/register',function(req,res,next){
  mongoClient.connect(url,{useNewUrlParser: true},function(error,client){
      if(error){
          console.log('unable to connect to server!!!');
      }
      else{
          var db = client.db('AMtest1');
          var collection = db.collection('values');
          var name = req.body.name;
          collection.insert({'name': name},function(err,result){
              if(err){
                throw err;
              }
              else{
                console.log('name is added');
              }
          });
      }
  });
});
app.get('/get',function(req,res){
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AMtest1");
    dbo.collection("values").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
});
app.listen(3008,()=>{
    console.log('connected to server!!');
});
