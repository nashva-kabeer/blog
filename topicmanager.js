var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var Topicmanager = require('./model/topicmanagerschema');
var Article = require('./model/articleschema');
var User = require('./model/userschema');

router.get('/login',(req,res)=> {
    res.render('tmlogin');
})

module.exports = router;