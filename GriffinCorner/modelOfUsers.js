const db = require('./database');
// const sql = require('../database.js');
const users = {};


//  Used to get the list of all available users involved.
users.getAll = async (req, res) => {
	const query = "SELECT * FROM `default`.users";
	try {
		const data = await sql.con.query(query);
		console.log(data[0]);
		console.log(data);
		res.json({ users: data });
	}
	catch (err) { console.log(err) }
}


users.removeUser = async (req, res) => {
	let query = `SELECT Username, Password
	FROM \`default\`.userModel WHERE Username = ${req.body['Username']}`;
	try{
		let data = await sql.con.query(query);
		if(data.length){
			query = `DELETE FROM \`default\`.userModel
			WHERE Username = ${req.body['Username']}`;
			try{
				await sql.con.query(query);
			}
			catch (err) { console.log(err) }
			query = `DELETE FROM \`default\`.userModel WHERE Username=${req.body['Username']};`;
			try {
				let data = await sql.con.query(query);
				res.json("Success");
			}
			catch (err) { console.log(err) }
		}
		else{
			res.json("No one has that username.")
		}
	}
	catch (err) { console.log(err) }
}

users.registerUser = async (req, res) => {
	let query = `SELECT Username, Password
	FROM \`default\`.userModel;
	console.log(validateUser(req.body['Username']))
	const validUsername =  await validateUser(req.body['Username']);
	console.log("Valid Username: "+ validUsername);
	if(validUsername){
		try {
			let data = await sql.con.query(query);

			if(!data.length) {
				query = `INSERT INTO \`default\`.userModel (Username, Password)
				VALUES(\'${req.body['Username']}\', ${req.body['Password']}\');`;
				try {
					data = await sql.con.query(query);
					res.json("Success");
				}
				catch (err) { console.log(err) }
			}
			else {
				res.json("User already exists");
			}
		}
		catch (err) { console.log(err) }
	}
	else{
		res.json("Username invalid.")
	}
}

async function validateUser(Username){
	const query = `SELECT *
	FROM \`default\`.userModel
	WHERE Username = ${Username};`;
	try{
		const data = await sql.con.query(query);
		console.log("Data Length: " + data.length);
		console.log("Data: " + data);
		if(data.length) return true;
		else return false;
	}
	catch( err ) {console.log(err) }

}


module.exports = users;
