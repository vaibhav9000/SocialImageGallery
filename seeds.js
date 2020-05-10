var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment.js')

var data = [
    {
        name: 'Tony Stark',
        image: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/IronMan-EndgameProfile.jpg/revision/latest/scale-to-width-down/2000?cb=20190423175213',
        description: 'Tony Stark is a marvel character'
    },
    {
      name: 'Thor',
      image: 'https://s1.r29static.com//bin/entry/92e/720x864,85/2169674/looks-like-another-thor-movie-2169674.webp',
      description: 'Thor is a marvel character'
    },
    {
      name: 'Doctor Strange',
      image: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/d/d9/Doctor_Strange_AIW_Profile.jpg/revision/latest/scale-to-width-down/2000?cb=20180518212354',
      description: 'Doctor Strange is a marvel character'
    }
  ]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log('Campgrounds removed')
            data.forEach(function(d){
                Campground.create(d, function(err, cg){
                    if(err){
                        console.log(err)
                    }else{
                        //console.log(cg)
                        //create a comment
                        Comment.create(
                            {
                                text: 'This is Marvel Studios',
                                author: 'Vaibhav Sharma'
                            },function(err, comment){
                                if(err){
                                    console.log(err)
                                }else{
                                    cg.comments.push(comment)
                                    cg.save()
                                    console.log('Created new Comment')
                                }
                            })
                    }
                })
            })
        }
    })
}
module.exports = seedDB