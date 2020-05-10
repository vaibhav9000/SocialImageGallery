var Campground = require('../models/campground')
var Comment = require('../models/comment')
//MIDDLEWARE
var middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('/login')
}
//CHECK Campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, fc){
            if(err){
                req.flash('error', 'Oops something went wrong')
                res.redirect('back')
            }else{
                if(fc.author.id != undefined){
                    if(fc.author.id.equals(req.user._id)){
                        next()
                    }else{
                        req.flash('error', 'This post does not belong to you')
                        res.redirect('back')
                    }
                }
                else{
                    res.redirect('back')
                }
            }
        })
    }else{
        res.redirect('back')
    }
}
//CHECK comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, fc){
            if(err){
                req.flash('error', 'Oops something went wrong')
                res.redirect('back')
            }else{
                if(fc.author.id != undefined){
                    if(fc.author.id.equals(req.user._id)){
                        next()
                    }else{
                        req.flash('error', 'This post does not belong to you')
                        res.redirect('back')
                    }
                }
                else{
                    res.redirect('back')
                }
            }
        })
    }else{
        res.redirect('back')
    }
}

module.exports = middlewareObj