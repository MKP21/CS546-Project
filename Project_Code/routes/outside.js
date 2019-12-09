const express = require('express');
const router = express.Router();
const roomFunctions=require('../data/room');
const userFunctions=require('../data/user');

router.get('/', async function(req, res) {
    var ses = req.session;
    if(ses.uMail){
      res.redirect('/user'); // if user is authenticated redirect to user's home
    }else{
      res.status(200).render('login',{title:"login"}); // render login form
    }
})

// if login path is called, it will check if user is logged in or not
router.get('/login',async function(req, res,next) {
    var ses = req.session;
    if(ses.uMail){
        res.redirect('/user'); // if user is authenticated redirect to user's home
    }else{
        res.render('login',{title:"login"}); // render login form
    }
})

// this is used when login form is submitted
router.post('/login',async (req,res) => {
    let sess = req.session; 
    let email = req.body.email;
    let enteredPassword = req.body.password;

    if(sess.uMail){
        // already logged in
        res.redirect('/user');
    }else{
        try{
            // check password
            var us = await userFunctions.userLogin(email,enteredPassword);
            if(us != null){
                sess.uMail = us.email;
            }
            // render login page with error
            if(sess.uMail){
                res.redirect('/user');
            }else{
                res.render('login',{title:"login",error:"username and/or password are incorrect"});
            }
        }catch(e){
            res.render('login',{title:"login",error:e});
        }
    }
    
});

// if signup link is clicked
router.get('/signup',async function(req, res) {
    var ses = req.session;
    if(ses.uMail){
      res.redirect('/user'); // if user is authenticated redirect to user's home
    }else{
      res.render('login',{title:"login"}); // render signup form
    }
})

// after signup form is submitted
router.post('/signup',async function(req, res) {
    var ses = req.session;
    if(ses.uMail){
      res.redirect('/user'); // if user is authenticated redirect to user's home
    }else{
      res.render('login',{title:"login"}); // render login form
    }
})

router.get('/logout',(req,res) => {
    // this comes after '/' middleware
    var ses = req.session;
    if(ses.uMail){
      req.session.destroy();
      res.render('logout',{title:"logged-out"}); // page with logout message
    }else{
      res.render('error',{title:"error",message:"you are already logged out"});
    }
    //req.session.destroy();
});

  
module.exports = router;