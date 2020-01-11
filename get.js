var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';
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
          console.log(result.name);
        });
    });
});
app.listen(303,()=>{
    console.log('connected to server!!');
});
