var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.redirect("/blogs");
})

router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User(
        { 
            username: req.body.username,
            avatarImageAddress: "https://unsplash.it/180/130?image=1005"
        }
    );
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blogs");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(res, res) {
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
 });

module.exports = router;