
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDHe1AQwUrxyMTl6hrii3nPsfWU4CSbVKg'
});

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
     //console.log(stops)
    for (let i = 0; i < stops.length; i++) {
             googleMapsClient.geocode({
                 address:stops[i]
             }, function(err, response) {
                 if (!err) {
                     var result=response.json.results;
                     geoCodedStops.push(result[0]['geometry']['location']);
                     count++;
                     if(count >= stops.length-1){
                          res.json(geoCodedStops);

                     }
                 }
                 else{
                     console.log(err);
                 }
           });
      }

});
app.post("/geocode2" , function(req,res,next){
    let geoCodedStops = []
    let count = 0;
    let stops = req.body;
    console.log(stops)
    for (let i = 0; i < stops.length; i++) {
        googleMapsClient.geocode({
            address:stops[i]
        }, function(err, response) {
            if (!err) {
                var result=response.json.results;
                geoCodedStops[i]=(result[0]['geometry']['location']);
                count++;
                if(count >= stops.length-1){
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
