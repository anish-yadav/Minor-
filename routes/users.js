var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')
var User = require('../model/user')
var errors = null
var error = null;

router.get('/login',(req,res) => {
    // res.sendFile('login.html', { root:__dirname+"/"+ '../public/components' });
    res.render('components/login',{error})
})
router.get('/register',(req,res) => {
    
    res.render('components/register', {errors})
})
router.get('/components/manager',(req,res) => {
    res.render('components/manager')
})

router.post('/register', (req,res) => {
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;
   var confirm = req.body.confirm;
 
  
     
    req.checkBody('username','Please enter a username').notEmpty();
    req.checkBody('email','Please enter an email').notEmpty();
    req.checkBody('email','Please enter a valid email').isEmail();
    req.checkBody('password','A password must be set').notEmpty();
    req.checkBody('password','Must be more than 6 characters').isLength({min:6});
    req.checkBody('confirm','Password must match').equals(req.body.password);
    errors = req.validationErrors();
    if (errors) {
        res.render('components/register',{errors})
    } else {
        var newUser = new User();
        newUser.username =username ;
        newUser.email = email;
        newUser.password = password;
     User.createUser(newUser,(err,user) => {
       if(err) {
           throw err;
       }
       else {
        msg = "You are successfully registered login now"
       res.redirect('components/login',{msg})
       }
   })
}
})

router.post("/login" , (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    User.getUserByUsername(username,(err,user) => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, resp) {
                if (resp === true) {
                    res.redirect('components/manager')
                } else {
                    error = "Password not recognized"
                    res.render('components/login',{error})
                }
            });
        } else {
            error = "Invalid User"
            res.render('components/login',{error})
        }
    })
})
router.get('/facebook/callback', (req,res) => {
    res.render('componets/manager')
})

module.exports = router