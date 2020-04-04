const express = require('express'); // Type of node.js
const bodyParser = require('body-parser'); // Parser
const cookieParser = require('cookie-parser'); // Parser
const mysql = require('mysql'); // Because we're connecting to a database

// Apparently WebStorm is great.

const allUserInfo = require('./routeToUsers.js'); // Routing Function.

// Though, later on we might have two pathways just to help with the logic,
// since we'll potentially have both user info and route info


// In that routeToUsers file will be a bunch of get & post requests,
// for info retrieval and adding new info respectively.


const app = express(); // Our app, essentially. The barebones, before everything is added.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const mc = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

mc.connect();

app.set('port',3000);

app.listen(app.get('port'), function(){  // How you actually get the thing up and running.
	console.log('Server started on port ' + app.get('port'));  // So we can show that we're connected.
});
