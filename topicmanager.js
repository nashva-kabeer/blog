var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var Topicmanager = require('./model/topicmanagerschema');
var Article = require('./model/articleschema');
var User = require('./model/userschema');

function checkSignInTopicmanager(req,res,next){
    if(req.session.admin){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.admin);
        res.redirect('/topicmanager/login')
    }
}

router.get('/login',(req,res)=> {
    res.render('tmlogin');
})

router.post('/login',(req,res) => {
    var tmInfo = req.body
    if(!tmInfo.userid || !tmInfo.password){
        res.render('tmlogin',{message: 'Please enter all details'})
    }else{
        Topicmanager.find({}).then((response) => {
            var data = response
            var tmloged = data.filter((value) => {
                if(value.userid == tmInfo.userid && value.password == tmInfo.password){
                    return true;
                }
            })
            if(!tmloged[0]){
                res.render('tmlogin',{message: "Invalid userid or Passwor! Please enter correctly"})
            }else{
                res.session.Topicmanager = tmloged[0];
                res.redirect('/topicmanager/home')
            }
        })
    }
});

router.get('/home',(req,res) => {
    res.render('tmhome')
})

module.exports = router;