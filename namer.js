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
          var db = client.db('sabdb2');
          var collection = db.collection('name');
          var name = req.body.name;
          var age = req.body.age;
          collection.insert({'name': name,'age': age},function(err,result){
              if(err){throw err;}
              else{
                console.log('name is added');
              }
          });
      }
  });
});
app.get("/getMyname",function(req,res){
    mongoClient.connect(url,function(err,client){
        if(err){
          throw err;
        }
        var database = client.db("sabdb3");
        database.collection("names").findOne({},function(error,result){
          if(error){
            throw error;
          }
          res.json(result);
        });
    });
});
app.listen(303,()=>{
    console.log('connected to server!!');
});
