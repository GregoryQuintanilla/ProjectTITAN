
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
// app.get('/Login', function(request, response) {
//   response.sendFile(path.join(__dirname +'/Login.js'));
// });
/*
app.post('/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM Administrators WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      console.log(error);
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/AdminPage');
      } else if(results.length==0){
        connection.query('SELECT * FROM Drivers WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
          if (results.length>0){
            console.log(results)
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/DriverPage')
          } else{
            response.send('Incorrect Username and/or Password!')
          }

        });
      }
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});
app.post('/register', function(request, response) {
  var status = request.body.status;
  var username = request.body.username;
  var password = request.body.password;
  if (username.length>0) {
    connection.query('SELECT * FROM Administrators WHERE username = ?', [username], function (error, results, fields) {
      if (results.length == 0) {
        connection.query('SELECT * FROM Drivers WHERE username = ?', [username], function (error, results, fields) {
          if (results.length == 0) {
            if (status.toLocaleLowerCase() == "admin") {
              connection.query("INSERT INTO Administrators (username,password) VALUES (?,?)", [username, password], function (err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                console.log(result);
              });
            }
            else if (status.toLocaleLowerCase() == "driver") {
                connection.query("INSERT INTO Drivers (username,password) VALUES (?,?)", [username, password], function (err, result, fields) {
                  // if any error while executing above query, throw error
                  if (err) throw err;
                  // if there is no error, you have the result
                  console.log(result);
                });
              }
          } else {
            console.log('Username is taken')
            response.end("Username is taken");
          }

        });
      } else{
        console.log('Username is taken');
        response.end('Username is taken');
      }
    });
  }
});


app.post('/DriverSubmit', function(request, response) {
  var name = request.body.name;
  var Username = request.body.Username;
  console.log(name)
  response.redirect('/Adminpage')


});
// app.get('/home', function(request, response) {
//   if (request.session.loggedin) {
//     response.send('Welcome back, ' + request.session.username + '!');
//   } else {
//     response.send('Please login to view this page!');
//   }
//   response.end();
// });

*/
app.listen(5000);
