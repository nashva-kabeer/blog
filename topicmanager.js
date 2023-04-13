var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var Topicmanager = require('./model/topicmanagerschema');
var Article = require('./model/articleschema');
var Subject = require('./model/subjectschema');
var User = require('./model/userschema');

function checkSignInTopicmanager(req,res,next){
    if(req.session.topicmanager){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.topicmanager);
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
            data = response
            var tmloged = data.filter((value) => {
                if(value.userid == tmInfo.userid && value.password == tmInfo.password){
                    return true;
                }
            })
            if(!tmloged[0]){
                res.render('tmlogin',{message: "Invalid userid or Passwor! Please enter correctly"})
            }else{
                //res.session.Topicmanager = tmloged[0];
                res.redirect('/topicmanager/home')
            }
        })
    }
});

router.get('/home',checkSignInTopicmanager,(req,res) => {
    res.render('tmhome')
});

router.get('/logout',(req,res) => {
    req.session.destroy(() => {
        console.log('Topic manager logged out');
    })
    res.redirect('/topicmanager/login');
});

app.use('/home', function(err, req, res, next){
    console.log(err);
    res.redirect('/topicmanager/login');
});

router.get('/articleapproval',checkSignInTopicmanager,(req,res) => {
    Article.find({}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('tmapproval',{data: response,data1: response1})
        })
    })
});

router.get('/rejectarticle/:id', (req,res) => {
    Article.findByIdAndUpdate(req.params.id,{approved:0}).then((response) => {
        res.redirect('/topicmanager/articlerejected');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/articlerejected',(req,res) => {
    Article.find().sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('tmapproval',{data: response ,data1: response1,message: "success"});
        })
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/approvearticle/:id', (req,res) => {
    Article.findByIdAndUpdate(req.params.id,{approved:1}).then((response) => {
        res.redirect('/topicmanager/articleapproved');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/articleapproved',(req,res) => {
    Article.find().sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('tmapproval',{data: response ,data1: response1,message1: "success"});
        })
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;