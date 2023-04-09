var express = require('express');
var router = express.Router();

router.get('/home',(req,res) => {
    res.render('home');
});


router.get('/signup',(req,res) => {
    res.render('signup');
});

/*router.post('/signup',(req,res) => {
    var userInfo = req.body

    if(!userInfo.name || !userInfo.mailid || !userInfo.ph || !userInfo.password){
        res.status(400);
        res.send("error");
    }else{
        
    }
})*/

router.get('/login',(req,res) => {
    res.render('login');
})


module.exports = router;