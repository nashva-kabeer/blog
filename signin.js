var express = require('express');
var router = express.Router();


router.get('/signup',(req,res) => {
    res.render('signup');
});

/*router.post('/signup',(req,res) => {
    var userInfo = req.body

    if(!userInfo.name || !userInfo.mailid || !userInfo.ph || !userInfo.password){
        
    }
})*/

router.get('/login',(req,res) => {
    res.render('login');
})


module.exports = router;