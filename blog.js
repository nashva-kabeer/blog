var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

app.use(session({
    secret: "Shh.Its a secret!",
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','pug');
app.set('views','./view');

app.use(express.static('blog/css'));
app.use(express.static('blog/js'));
app.use(express.static('blog/images'));

var signup = require('./signin.js')
var dashboard = require('./dashbord.js')

app.use('/',signup);
//app.use('/dashboard',dashboard);

app.listen(8090);