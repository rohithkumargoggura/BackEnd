var router = require('express').Router();
// Import User Module Containing Functions Related To User Data
//var user = require('../models/user');
var mysql = require('mysql');
// API Routes
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'demo'
});

connection.connect(function (error, success) {
	if (error) {
		console.log("Errro while connecting DB " + error);
	}
	//console.log("Database connected");
});
// router.get('/', function(req, res) {

// 	user.findAll(function(err, rows, fields) {
// 		if(err) throw err;
// 		res.json({"message":"success"});
// 	})
// });
router.post('/adduser', (req, res) => {
	//console.log("User",user);
	console.log(req.body);
	//return res.json({"user":req.body});
	connection.query(`select email from user WHERE email = ?`,[req.body.email],(error,data)=>{
		if(error){
			console.log(error);
		}
		else if(data.length == 1){
			res.json({"message":"Email Already exist"})
		}
		else{
			connection.query(`INSERT INTO user SET ?`, req.body, (error, success) => {
				if (error) {
					console.log(error)
				}
				else {
					res.json({ "message": "success" })
				}
			});
		}
		
	})
	
});

router.get('/getUsers', (req, res) => {
	connection.query(`select name , email , mobile from user`, (error, data) => {
		if (error) {
			console.log(error)
		}
		else {
			// res.json({"message":"success"});
			//console.log(success);
			res.json(data);
		}

	});

});

router.post('/updateuser', (req, res) => {
	//console.log("User",user);
	console.log(req.body);
	//return res.json({"user":req.body});
	connection.query('UPDATE user SET name = ?, email = ?, mobile = ? WHERE email = ?', [req.body.name, req.body.email, req.body.mobile, req.body.email], (error, success) => {
		if (error) {
			console.log(error)
		}
		else {
			res.json({ "message": "success" })
		}
	});
});

router.post('/deleteUsers', (req, res) => {
	
	console.log("Delete User", req.body.email);
	console.log(req.body);
	connection.query('DELETE from user WHERE email = ?', [req.body.email], (error, success) => {
		if (error) {
			console.log(error)
		}
		else {
			res.json({ "message": "success" })
		}
	});
});

router.post('/adduserStory', (req, res) => {
	console.log("in API");
	console.log(req.body);
	//return res.json({"user":req.body});
	// connection.query(`select email from user WHERE email = ?`,[req.body.email],(error,data)=>{
	// 	if(error){
	// 		console.log(error);
	// 	}
	// 	else if(data.length == 1){
	// 		res.json({"message":"Email Already exist"})
	// 	}
	// 	else{
			connection.query(`INSERT INTO userstories SET ?`, req.body, (error, success) => {
				if (error) {
					console.log(error)
				}
				else {
					res.json({ "message": "success" })
				}
			});
	// 	}
		
	// })
	
});
router.get('/getUserStories', (req, res) => {
	connection.query(`SELECT name , COUNT(*) as count from userstories GROUP BY name`, (error, data) => {
		if (error) {
			console.log(error)
		}
		else {
			// res.json({"message":"success"});
			//console.log(success);
			res.json(data);
		}

	});

});
router.post('/addStory', (req, res) => {
	console.log("in API");
	console.log(req.body);
	
			connection.query(`INSERT INTO stories SET ?`, req.body, (error, success) => {
				if (error) {
					console.log(error)
				}
				else {
					res.json({ "message": "success" })
				}
			});
	
});
router.get('/getStories', (req, res) => {
	connection.query(`SELECT count(state) as count, application, state FROM demo.stories group by application, state;`, (error, data) => {
		if (error) {
			console.log(error)
		}
		else {
			res.json(data);
		}

	});

});

router.get('/getComment', (req, res) => {
	connection.query(`SELECT rating , value FROM demo.comment;`, (error, data) => {
		if (error) {
			console.log(error)
		}
		else {
			res.json(data);
		}

	});

});

module.exports = router;
