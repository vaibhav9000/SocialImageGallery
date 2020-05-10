var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var Comment = require('../models/comment')
var middleware = require('../middleware/index.js')
//CAMPGROUND ROUTES
router.get('/', function(req, res){
    console.log(req.user)
    Campground.find({}, function(err, allcg){
        if(err){
            console.log(err)
        }
        else{
            res.render('campgrounds/campgrounds', {campgrounds: allcg,
            currentUser : req.user })
        }
    })
})

router.post('/', middleware.isLoggedIn, function(req, res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcampgrounds = {name: name, image: image, 
        description: description, author: author}
    Campground.create(newcampgrounds, function(err, newcg){
        if(err){
            console.log(err)
        }
        else{
            console.log(newcg)
            req.flash('success', 'You successfully added new image')
            res.redirect('/campgrounds')
        }
    })
})
//new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new')
})
router.get('/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, fc){
       if(err){
           console.log(err)
       } 
       else{
           console.log(fc)
           res.render('campgrounds/show', {campground: fc})
       }
       //res.render('show', {campground: fc})
    })
})
//EDIT CAMPGROUND
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, fc){
        res.render('campgrounds/edit', {campground:fc})
    })  
})
//PUT CAMPGROUND 
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    //find and update correct cg and redirect somewhere
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,
        function(err, uc){
            if(err){
                res.redirect('/campgrounds')
            }else{
                req.flash('success', 'You successfully updated your image')
                res.redirect('/campgrounds/'+req.params.id)
            }
        })
})
//DESTROY CAMPGROUND
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds')
        }else{
            req.flash('success', 'You successfully removed your image')
            res.redirect('/campgrounds')
        }
    })
})


module.exports = router