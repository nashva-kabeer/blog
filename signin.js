var express = require('express');
var router = express.Router();


router.get('/signup',(req,res) => {
    res.render('signup');
})

router.get('/login',(req,res) => {
    res.render('login');
})


module.exports = router;