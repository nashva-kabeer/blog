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

app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

app.set('view engine','pug');
app.set('views','./view');

app.use(express.static('blog/css'));
app.use(express.static('blog/js'));
app.use(express.static('blog/images'));

var signup = require('./signin.js')
var article = require('./articles.js')
var admin = require('./admin.js')
var topicmanager = require('./topicmanager.js')

app.use('/',signup);
app.use('/article',article);
app.use('/admin',admin);
app.use('/topicmanager',topicmanager);

app.listen(8090);