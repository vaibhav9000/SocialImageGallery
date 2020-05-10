var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var Comment = require('../models/comment')
var passport = require('passport')
var User = require('../models/user')
//landing
router.get('/', function(req, res){
    res.render('landing')
})
//AUTH ROUTES
router.get('/register', function(req, res){
    res.render('register')
})
//signup
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            req.flash('error', err.message)
            res.redirect('/register')
            return null
        }
        passport.authenticate('local')(req, res, function(){
        req.flash('success', 'Welcome to Social Image Gallery '+user.usernam)
           res.redirect('/campgrounds') 
        })
    })
})
//LOGIN
router.get('/login', function(req, res){
    res.render('login')
})
//app.post('login', middleware, callback)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    req.flash('success', 'You successfully added new image')
    res.redirect('/campgrounds')
})
//LOGOUT
router.get('/logout', function(req, res){
    req.logout()
    req.flash('success', 'Successfully logged you out')
    res.redirect('/campgrounds')
})
//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
module.exports = router