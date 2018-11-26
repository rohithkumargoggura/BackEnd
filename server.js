var express = require('express');
var bodyParser = require('body-parser');
userroutes = require('./api/user_api');
//var bcrypt = require('bcrypt');
var mysql = require('mysql');

// Initialize Express App
var app = express();
app.use(function(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
  

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set Static Path
//app.use('/', express.static(__dirname));

// Import API Routes
app.use('/',userroutes);
// app.get('/',(req,res)=>{
// 	console.log("in route");
//    res.json({
// 	   "message":"success"
//    })
// })






port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("listening to port " + port);
})

