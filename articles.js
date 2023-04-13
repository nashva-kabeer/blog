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
        console.log("Not Logged In");
        res.redirect('/login')
    }
}

router.get('/managearticles',checkSignIn,(req,res) => {
    var email = req.session.user.email
    Article.find({}).sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response2) => {
            res.render('managearticle',{data: response, data1:response2, email:email});
        })
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/update/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        Article.find({}).then((value) => {
            Subject.find({}).then((val) => {
                res.render('articleedit',{data: response ,data1: val,article:response.article});
            })
        })
    }).catch((err) => {
        console.log(err)
    })
});

router.post('/update/:id', (req,res) => {
    Article.findByIdAndUpdate(req.params.id,req.body).then((response) => {
       res.redirect('/article/updatearticle')
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/updatearticle',(req,res) => {
    var email = req.session.user.email
    Article.find().sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response2) => {
            res.render('managearticle',{data: response ,data1: response2,email: email,message: "success",});
        })
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/deletearticle/:id',(req,res) => {
    Article.findByIdAndRemove(req.params.id).then((response) => {
        res.redirect('/article/deletedarticle');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/deletedarticle',(req,res) => {
    var email = req.session.user.email
    Article.find().sort({createdAt:-1}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('managearticle',{data: response ,data1: response1,email: email,message2: "success"});
        })
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/addarticle',checkSignIn,(req,res) => {
    Article.find({}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('addarticle',{data: response, data1: response1});
        })
    }).catch((err)=> {
        console.log(err);
    })
});

router.post('/addarticle',(req,res) => {
    var articleInfo = req.body
    var email = req.session.user.email
    if(!articleInfo.title || !articleInfo.subject || !articleInfo.description || !articleInfo.article){
        res.render('addarticle',{message: "Enter every field"});
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
        newArticle.save().then((article) => {
            res.redirect('/article/managearticles')
        }).catch((err) => {
            console.log(err)
        })
    }
});

module.exports = router;