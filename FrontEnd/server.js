
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBGfI5yVMIYp2OsKUcrudxaZ22TkdfshqI'
});
/*
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'TitanDB'
});
*/
var app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());




app.get('/',function(req,res,next){
     res.send(req.body);
});
app.post('/',function(req,res,next){
     res.json(req.body);
});

app.post("/geocode" , function(req,res,next){
     let geoCodedStops = []
     let count = 0;
     let stops = req.body;
     console.log(req.body);
     console.log(req.body[0]);
     console.log(stops.length);
    for (let i = 0; i < stops.length; i++) {
             console.log("Should have geo encoded");
             googleMapsClient.geocode({
                 address:stops[i]
             }, function(err, response) {
                 if (!err) {
                     var result=response.json.results;
                     console.log(result[0]['geometry']['location']);
                     geoCodedStops.push(result[0]['geometry']['location']);
                     count++;
                     console.log(count);
                     if(count >= stops.length-1){
                          console.log("sent json back");
                          res.json(geoCodedStops);
                     }
                 }
                 else{
                     console.log(err);
                 }
           });
      }

});
app.listen(5000);
