
// var mysql = require('mysql');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var cors = require('cors');
//
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   port     : '3306',
//   user     : 'root',
//   password : 'Alex1415!',
//   database : 'TitanDB'
// });
// var app = express();
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(cors());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
//
// app.get('/CheckAdminLoggedIn', function (req, res) {
//   connection.query('select Administrator from CurrentlyLoggedIn ', [],function (error, results, fields) {
//     // console.log(res[0].Administrator)
//     if (error) throw error;
//     // res.end(JSON.stringify(results));
//   });
// });
// app.get('/CheckDriverLoggedIn', function (req, res) {
//   connection.query('select Driver from CurrentlyLoggedIn ', [],function (error, results, fields) {
//     // console.log(results[0].Administrator)
//     if (error) throw error;
//     res.end(JSON.stringify(results));
//   });
// });
//
// // app.post('/Login', function(request, response) {
// //   var username = request.body.username;
// //   var password = request.body.password;
// //   if (username && password) {
// //     connection.query('SELECT * FROM Administrators WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// //       console.log(error)
// //       if (results.length > 0) {
// //         // connection.query('INSERT INTO CurrentlyLoggedIn (Administrator) VALUES (?)', [username], function (error, results, fields){});
// //         request.session.loggedin = true;
// //         request.session.username = username;
// //         response.redirect('/AdminPage');
// //       } else if(results.length==0){
// //         connection.query('SELECT * FROM Drivers WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
// //           if (results.length>0){
// //             console.log(results)
// //             request.session.loggedin = true;
// //             request.session.username = username;
// //             response.redirect('/DriverPage')
// //           } else{
// //             response.send('Incorrect Username and/or Password!')
// //           }
// //
// //         });
// //       }
// //     });
// //   } else {
// //     response.send('Please enter Username and Password!');
// //     response.end();
// //   }
// // });
//
// app.post('/register', function(request, response) {
//   var status = request.body.status;
//   var username = request.body.username;
//   console.log(username)
//   var password = request.body.password;
//   if (username.length>0) {
//     connection.query('SELECT * FROM Administrators WHERE username = ?', [username], function (error, results, fields) {
//       console.log(error)
//       if (results.length == 0) {
//         connection.query('SELECT * FROM Drivers WHERE username = ?', [username], function (error, results, fields) {
//           console.log(error)
//           if (results.length == 0) {
//             if (status.toLocaleLowerCase() == "admin") {
//               connection.query("INSERT INTO Administrators (username,password) VALUES (?,?)", [username, password], function (err, result, fields) {
//                 // if any error while executing above query, throw error
//                 if (err) throw err;
//                 // if there is no error, you have the result
//                 response.redirect('localhost:3000/Login')
//                 console.log(result);
//               });
//             }
//             else if (status.toLocaleLowerCase() == "driver") {
//                 connection.query("INSERT INTO Drivers (username,password) VALUES (?,?)", [username, password], function (err, result, fields) {
//                   // if any error while executing above query, throw error
//                   if (err) throw err;
//                   // if there is no error, you have the result
//                   console.log(result);
//                 });
//               }
//           } else {
//             console.log('Username is taken')
//             response.end("Username is taken");
//           }
//
//         });
//       } else{
//         console.log('Username is taken');
//         response.end('Username is taken');
//       }
//     });
//   }
// });
//
// app.post('/RedirectToLogin', function(request,response,error) {
//   response.redirect('/Login')
//   console.log(error)
//   //connection.query('SELECT * FROM Drivers WHERE username = ?', [Username], function (error, results, fields){}
//   //   connection.query('INSERT INTO Drivers (Administrator,name) VALUES (?,?)', [Username], function (error, results, fields){
//   //
//   //   }
//
// });
// app.post('/DriverSubmit', function(request, response) {
//   var Username = request.body.Username;
//   var name = request.body.name;
//   // connection.query('SELECT * FROM Drivers WHERE username = ?', [Username], function (error, results, fields){
//   //   connection.query('INSERT INTO Drivers (Administrator,name) VALUES (?,?)', [Username], function (error, results, fields){
//   //
//   //   }
//
//   console.log(Username, name)
//
// });
//
// // app.get('/Authenticate', function (req, res) {
// //   // Connecting to the database.
// //   connection.getConnection(function (err, connection) {
// //
// //     // Executing the MySQL query (select all data from the 'users' table).
// //     connection.query('SELECT * FROM users', function (error, results, fields) {
// //       // If some error occurs, we throw an error.
// //       if (error) throw error;
// //
// //       // Getting the 'response' from the database and sending it to our route. This is were the data is.
// //       res.send(results)
// //     });
// //   });
// // });
//
// app.listen(5000, function() {
//   console.log('Example app listening on port 5000!');
// });
