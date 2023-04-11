var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var User = require('./model/userschema');
var Subject = require('./model/subjectschema');

// admin dashboard manage people

router.get('/manageuser',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('admindbd', {data: response});
        //console.log(response);
    }).catch(function(err){
        console.log(err);
    })
});

router.get('/edit/:id', (req,res) => {
    User.findById(req.params.id).then((response) => {
        res.render('adminedit',{data: response});
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/edit/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id,req.body).then((response) => {
        res.redirect('/manageuser');
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/manageuser/edited',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('admindbd',{message: "Edited Successfully"});
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/delete/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id).then((response) => {
        res.redirect('/manageuser/deleted');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/manageuser/deleted',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('admindbd',{message2: "Deleted Successfully"});
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;