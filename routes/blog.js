var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");

router.get("/", function (req, res) {
    Blog.find({}, function (err, allBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render("blog/index", { blogs: allBlog });
        }
    });
});

router.get("/new", function (req, res) {
    res.render("blog/new");
});

router.post("/", function (req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var category = req.body.category;
    var content = req.body.content;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    tags = req.body.tags.split(" ");
    console.log(tags);
    var newBlog = { title: title, image: image, category: category, tags: tags, body: content, author: author }
    // Create a new blog and save to DB
    Blog.create(newBlog, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("blogs");
        }
    });
});

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Blog.findById(req.params.id).exec(function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("blog/show", { blog: foundBlog });
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
 });

module.exports = router;