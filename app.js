//importing libraries
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var methodOverride = require('method-override')
var flash = require('connect-flash')

//importing models of database
var Campground = require('./models/campground')
var seedDB = require('./seeds')
var Comment = require('./models/comment')
var User = require('./models/user')

//REQUIRING ROUTES
var commentRoutes = require('./routes/comments')
var campgroundRoutes = require('./routes/campgrounds')
var authRoutes = require('./routes/index')

app.use(express.static(__dirname+'/public'))
//seedDB()
//connectiong to mongodb
mongoose.connect('mongodb://localhost/yelpcamp')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
//flash is used to display flash messages
app.use(flash())

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Once again',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

app.use(authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(3000, '127.0.0.1', function(req, res){
    console.log('Server has started')
})