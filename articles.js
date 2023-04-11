var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var Article = require('./model/articleschema');
var Subject = require('./model/subjectschema');

function checkSignIn(req,res,next){
    if(req.session.user){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.user);
        next(err);
    }
}

router.get('/managearticles',checkSignIn,(req,res) => {
    Article.find({email: req.session.user.email}).sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response2) => {
            res.render('usermanage',{data: response, data1:response2});
        });
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/addarticle',checkSignIn,(req,res) => {
    Subject.find({}).then((response) => {
        res.render('useradd',{data: response});
    }).catch((err)=> {
        console.log(err);
    })
});

router.post('/addarticle',(req,res) => {
    var articleInfo = req.body
    var email = req.session.user.email
    if(!articleInfo.title || !articleInfo.subject || !articleInfo.description || !articleInfo.article){
        res.render('useradd',{message: "Enter every field"});
    }else{
        var newArticle = new Article({
            email: email,
            title: articleInfo.title,
            subject: articleInfo.subject,
            description: articleInfo.description,
            article: articleInfo.article,
            createdAt: articleInfo.createdAt,
            approved:0
        })
        newArticle.save().then((req,res) => {
            res.redirect('/manageuser')
        }).catch((err) => {
            console.log(err)
        })
    }
});

module.exports = router;