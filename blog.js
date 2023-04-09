var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','pug');
app.set('views','./view');

app.use(express.static('blog/css'));
app.use(express.static('blog/js'));
app.use(express.static('blog/images'));

var userSchema = mongoose.Schema({
    name: String,
    mailid: String,
    phone: Number,
    password: String,
    createdAt: {type: Date, default: Date.now}
});


var signup = require('./signin.js')

app.use('/',signup);

app.listen(8090);