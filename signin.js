var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var User = require('./model/userschema.js');

var data = [];

router.get('/',(req,res) => {
    res.render('home');
});

router.get('/signup',(req,res) => {
    res.render('signup');
});

router.post('/signup',(req,res) => {
    var userInfo = req.body;
    if(!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.password){
        res.render('signup',{message: "invalid details! Enter Every Field"});
    }else{
        User.find({}).then((response)=>{
            data = response;
            //console.log(data);
            var signeduser = data.filter(function(value){
                if(value.email == userInfo.email){
                    return value.email;
                }
            })
            if( !signeduser[0] ){
                var createdAt = Date.now();
                var newUser = new User({
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    password: userInfo.password,
                    createdAt: userInfo.createdAt,
                    approved: 1
                })
                //console.log(userInfo);
                newUser.save().then(()=>{
                    res.render('show',{
                        message: "New user added", type: "success", user: userInfo});
                }).catch((err)=>{
                    res.render('show', {message: "Database error" ,type: "error"});
                    console.log(err);
                });
                req.session.user = newUser;
            }else{
                res.render('signup', {
                    message: "User with this mailid Already Exists! Login or choose another mailid"});
            }
        });
    }
});

router.get('/login',(req,res) => {
    res.render('login');
})

router.post('/login',(req,res) => {
    var userInfo = req.body;
    if( !userInfo.email || !userInfo.password){
        res.render('login', {message: "Enter all Details"});
    }else{
        User.find({}).then(function(response){
            datalogin = response;
            var logeduser = datalogin.filter(function(value){
                if(value.email==userInfo.email && value.password==userInfo.password){
                    return true;
                }
            })
            if( !logeduser[0] ){
                res.render('login', {message: "Invalid mail or password.Didnt register? Register first"});
            }else{
                req.session.user = logeduser[0];
                res.redirect('/dashboard');
            }
        })
    }
});

function checkSignIn(req,res,next){
    if(req.session.user){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.user);
        next(err);
    }
}

router.get('/dashboard',checkSignIn,(req,res) => {
    res.render('dashboard',{id: req.session.user.id});
});

router.get('/dashboard',(req,res) => {
    res.render("dashboard");
});

router.get('/logout',(req,res) => {
    req.session.destroy(() => {
        console.log('user logged out');
    })
    res.redirect('/');
});

router.use('/dashboard',(err,req,res,next) => {
    console.log(err);
    res.redirect('/');
})

module.exports = router;