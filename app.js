const seedDB = require("./seed");

var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer");
    moment = require("moment");
    passport = require("passport");
    LocalStrategy = require("passport-local");

var Blog = require("./models/blog");
    Comment = require("./models/comment");
    User = require("./models/user");
    
var blogRoute = require("./routes/blog");
    indexRoute = require("./routes/index");

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.use(require("express-session")({
    secret: "Hello world!",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// encode the user, serialize the user and put it back to session
passport.serializeUser(User.serializeUser());
// read a session, take the data from a session and encode or unencode the session
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.locals.moment = require('moment');
app.locals.marked = require('marked');

// seedDB();

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });

app.use("/blogs", blogRoute);
app.use("/", indexRoute);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("SERVER IS RUNNING");
});