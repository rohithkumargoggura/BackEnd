//var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Root@12345.',
	database: 'demo'
});

connection.connect(function() {
	console.log("Database connected");
});


// module.exports.findAll = function(callback) {
// 	connection.query("SELECT * FROM users ORDER BY id DESC", callback);
// }

module.exports = connection;
// module.exports.addUser = function(data) {
// 	connection.query(`INSERT INTO user (name,email,mobile,gender,password) values ("rohith","ab@abc.com","12345","male","1234") `,(error,success)=>{
// 		if(error){
//            console.log(error);
// 		}
// 		else{
// 			console.log("success");
// 		}
// 	});
// }

// module.exports.findByUsername = function(username, callback) {
// 	connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
// }

// module.exports.encrypt = function(data, callback) {
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(data.password, salt, callback);
// 	})
// }

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}