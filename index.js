var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var dbconfig = require('./db.js');

const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const strategy = require('passport-local').Strategy;



//connect to mlab database
mongoose.connect(dbconfig.url_docker, {connectTimeoutMS:30000, useNewUrlParser:true})
    .then(console.log("connected to DB"))
    .catch( (err) => { console.log("Error connecting to DB " + err)} );


var app = express();
module.exports = express;

var router = express.Router();
//logger function applied to all calls
router.use(function logEndpointAccess(req, res, next) {
    console.log('access: ' + req.method + ' ' + req.url.toString());
    next();
})

router.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + "/static/root.html"));
});

router.get('/test', function(req, res) { 
    res.send('Test!');
});

router.post('/login',function(req, res) {
    console.log('login called');
    res.end();
});

//catchall for unknown URL
router.use(function(req, res, next) {
    res.status(404).send("Welcome to the wasteland...")
});

//use router
app.use('/', router);

//allow cross origin requests
app.use(cors());

//create a session (cookie)
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));
/*
passport.use( new strategy( function(username, password, done) {

}) );
*/
app.use(passport.initialize());
app.use(passport.session());

//start listener on port of choice
app.listen(80, function() { 
    console.log('Webserver started....'); 
});