var express = require('express');
var router = express.Router();

function checkSignIn(req,res,next){
    if(req.session.user){
        next();
    }else{
        var err = new Error("Not Logged In");
        console.log(req.session.user);
        next(err);
    }
}

router.get('/',checkSignIn,(req,res) => {
    res.render('dashboard',{id: req.session.user.id});
});

router.get('/',(req,res) => {
    res.render("dashboard");
});

module.exports = router;