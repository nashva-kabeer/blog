var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb")

var User = require('./model/userschema');
var Subject = require('./model/subjectschema');
var Admin = require('./model/adminschema');
var Topicmanager = require('./model/topicmanagerschema');


function checkSignInAdmin(req,res,next){
    if(req.session.admin){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.admin);
        res.redirect('/admin')
    }
}


//admin dashboard main
router.get('/',(req,res) => {
    res.render('adminlogin');
});

router.post('/',(req,res) => {
    var adminInfo = req.body
    if(!adminInfo.userid || !adminInfo.password){
        res.render('adminlogin',{message: "please enter every fields"})
    }else{
        Admin.find({}).then(function(response){
            datalogin = response;
            var adminlogin = datalogin.filter(function(value){
                if(value.userid==adminInfo.userid && value.password==adminInfo.password){
                    return true;
                }
            })
            if( !adminlogin[0] ){
                res.render('adminlogin', {message: "Invalid userid or password.Enter correctly!"});
            }else{
                req.session.admin = adminlogin[0];
                res.redirect('/admin/home');
            }
        })
    }
});

router.get('/home',checkSignInAdmin,(req,res) => {
    res.render('admindbd');
});

router.get('/home',(req,res) => {
    res.render('admindbd');
});

router.get('/logout',(req,res) => {
    req.session.destroy(() => {
        console.log('admin logged out');
    })
    res.redirect('/admin');
});

//admin manage topics
router.get('/managetopic',checkSignInAdmin,(req,res) => {
    Subject.find({}).then((response) => {
        res.render('managetopic',{data: response})
    }).catch((err) => {
        console.log(err)
    })
});

router.get('/subjectedit/:id',(req,res) => {
    Subject.findById(req.params.id).then((response) => {
        res.render('subjectedit',{data: response})
    }).catch((err) => {
        console.log(err)
    })
});

router.post('/subjectedit/:id', (req,res) => {
    Subject.findByIdAndUpdate(req.params.id,req.body).then((response) => {
        res.redirect('/admin/edittopic');
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/edittopic',(req,res) => {
    Subject.find().sort({subject:1}).then((response) => {
        res.render('managetopic',{data: response ,message: "Edited Successfully"});
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/subjectdelete/:id',(req,res) => {
    Subject.findByIdAndRemove(req.params.id).then((response) => {
        res.redirect('/admin/deletetopic');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/deletetopic',(req,res) => {
    Subject.find().sort({subject:1}).then((response) => {
        res.render('managetopic',{data: response ,message2: "Deleted Successfully"});
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/addtopic',checkSignInAdmin,(req,res) => {
    res.render('addtopic')
});

router.post('/addtopic',(req,res) => {
    var topicInfo = req.body
    if(!topicInfo.subject){
        res.render('addtopic',{message: "please add topic"})
    }else{
        var newSubject = new Subject({
            subject: topicInfo.subject
        })
        newSubject.save().then((subject) => {
            res.redirect('/admin/managetopic')
        }).catch((err) => {
            console.log(err)
        })
     }
});

// admin dashboard manage users

router.get('/manageuser',checkSignInAdmin,(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('adusermanage', {data: response});
        //console.log(response);
    }).catch(function(err){
        console.log(err);
    })
});

router.get('/reject/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id,{approved:0}).then((response) => {
        res.redirect('/admin/manageuser/rejected');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/manageuser/rejected',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('adusermanage',{data: response ,message3: "success"});
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/approve/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id,{approved:1}).then((response) => {
        res.redirect('/admin/manageuser/approved');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/manageuser/approved',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('adusermanage',{data: response ,message4: "success"});
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/delete/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id).then((response) => {
        res.redirect('/admin/manageuser/deleted');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/manageuser/deleted',(req,res) => {
    User.find().sort({createdAt:-1}).then((response) => {
        res.render('adusermanage',{data:response, message2: "success"});
    }).catch((err) => {
        console.log(err);
    })
});

//admin dashboard manage Topicmanagers
router.get('/topicmanager',checkSignInAdmin,(req,res) => {
    Topicmanager.find({}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('topicmanagers',{data: response, data1: response1})
        })
    }).catch((err) => {
        console.log(err)
    })
});

router.get('/editmanager/:id',(req,res) => {
    Topicmanager.findById(req.params.id).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('edittopicmanager',{data: response,data1: response1})
        })
    }).catch((err) => {
        console.log(err)
    })
});

router.post('/editmanager/:id', (req,res) => {
    Topicmanager.findByIdAndUpdate(req.params.id,req.body).then((response) => {
        Subject.find({}).then((response1) => {
            res.redirect('/admin/edittopicmanager');        
        })
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/edittopicmanager',(req,res) => {
    Topicmanager.find().sort({subject:1}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('topicmanagers',{data: response ,data1: response1,message: "success"});        
        })
    }).catch((err) => {
        console.log(err);
    })
});


router.get('/deletemanager/:id',(req,res) => {
    Topicmanager.findByIdAndRemove(req.params.id).then((response) => {
        res.redirect('/admin/deletemanager');
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/deletemanager',(req,res) => {
    Topicmanager.find().sort({subject:1}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('topicmanagers',{data: response ,data1: response1, message2: "success"})
        });
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/addtopicmanager',checkSignInAdmin,(req,res) => {
    Topicmanager.find({}).then((response) => {
        Subject.find({}).then((response1) => {
            res.render('addtopicmanager',{data: response,data1: response1})
        })
    }).catch((err) => {
        console.log(err)
    })
});

router.post('/addtopicmanager',(req,res) => {
    var topicmanagerInfo = req.body
    if(!topicmanagerInfo.name || !topicmanagerInfo.userid || !topicmanagerInfo.subject || !topicmanagerInfo.password){
        res.render('addtopicmanager',{message: "Enter every field"});
    }else{
        var newTopicmanager = new Topicmanager({
            name: topicmanagerInfo.name,
            userid: topicmanagerInfo.userid,
            subject: topicmanagerInfo.subject,
            password: topicmanagerInfo.password,
            createdAt: topicmanagerInfo.createdAt,
        })
        newTopicmanager.save().then((manager) => {
            res.redirect('/admin/topicmanager')
        }).catch((err) => {
            console.log(err)
        })
    }
});



module.exports = router;