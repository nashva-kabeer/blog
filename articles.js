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
    Article.find({email:email}).sort({createdAt:-1}).then((response) => {
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
    Article.find({email:email}).sort({createdAt:-1}).then((response) => {
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
    Article.find({email:email}).sort({createdAt:-1}).then((response) => {
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

//readarticles 
router.get('/readarticle',(req,res) => {
    res.render('readarticle')
});

router.get('/technology',(req,res) => {
    Article.find({subject:"64368e86d16ba73bdd80585e",approved:1}).then((response) => {
        res.render('articletechnology',{data:response})
    }).catch((err) =>{
        console.log(err)
    })
});

router.get('/techreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('techreadmore',{value:response})
    }).catch((err) =>{
        console.log(err)
    })
});

router.get('/comment/:id',checkSignIn,(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('comment',{value:response})
    }).catch((err) =>{
        console.log(err)
    })
})

router.get('/techreadless',(req,res) => {
    res.redirect('/article/technology')
});

router.get('/travel',(req,res) => {
    Article.find({subject:"6437eeaada1aa3e3442e18c3"}).then((response) => {
        res.render('articletravel',{data:response})
    })
});

router.get('/travreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('travelreadmore',{value:response})
    })
});

router.get('/travreadless',(req,res) => {
    res.redirect('/article/travel')
});

router.get('/entertainment',(req,res) => {
    Article.find({subject:"6438c63200cd0db8d9adf58a"}).then((response) => {
        res.render('articleentertainment',{data:response})
    })
});

router.get('/entreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('entreadmore',{value:response})
    })
});

router.get('/entreadless',(req,res) => {
    res.redirect('/article/entertainment')
});

router.get('/food',(req,res) => {
    Article.find({subject:"64365ac784fa78cd83a71a98"}).then((response) => {
        res.render('articlefood',{data:response})
    })
});

router.get('/foodreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('foodreadmore',{value:response})
    })
});

router.get('/foodreadless',(req,res) => {
    res.redirect('/article/food')
});

router.get('/beauty&fashion',(req,res) => {
    Article.find({subject:"64365a22d07b44485b95e3b5"}).then((response) => {
        res.render('articlebeauty',{data:response})
    })
});

router.get('/fashreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('fashreadmore',{value:response})
    })
});

router.get('/fashreadless',(req,res) => {
    res.redirect('/article/beauty&fashion')
});

router.get('/health&fitness',(req,res) => {
    Article.find({subject:"6437ee7c2d5e39cceb534517"}).then((response) => {
        res.render('articlehealth',{data:response})
    })
});

router.get('/helreadmore/:id',(req,res) => {
    Article.findById(req.params.id).then((response) => {
        res.render('techreadmore',{value:response})
    })
});

router.get('/helreadless',(req,res) => {
    res.redirect('/article/health&fitness')
});


module.exports = router;