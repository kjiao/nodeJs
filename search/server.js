var express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	path = require('path'),

	port = 8080,
	db = 'mongodb://localhost/search-app';
var users = require('./routes/user');

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'super secret',
	saveUninitialized: true,
	resave: true
}));

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

app.listen(port, function(){
	console.log('app listening on port ' + port)
});