var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

router.get("/", function (req, res) {
    Blog.find({}, function (err, allBlog) {
        if (err) {
            console.log(err);
        } else {
            Blog.distinct("tags", function(errors, allTags) {
                Blog.distinct("category", function(errors, allCategories) {
                    res.render("blog/index", { blogs: allBlog, tags: allTags, categories: allCategories});
                })
            })
        }
    });
});

router.get("/category/:id", function(req, res) {
    console.log(req.params.id);
    var category_name = req.params.id;
    Blog.find({"category": category_name}, function(err, allBlog) {
        res.status(200);
        res.render("blog/search_result", {blogs: allBlog});
        res.end();
    });
});

router.get("/tag/:id", function(req, res) {
    console.log(req.params.id);
    var tag_name = req.params.id;
    Blog.find({"tags": tag_name}, function(err, allBlog) {
        res.status(200);
        res.render("blog/search_result", {blogs: allBlog});
        res.end();
    });
});

router.get("/new", function (req, res) {
    res.render("blog/new");
});

router.post("/", middleware.isHostLogin, function (req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var category = req.body.category;
    var content = req.body.content;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    tags = req.body.tags.split(" ");
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
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            // Blog.find.distinct("tags", function(errors, foundTags) {
                res.render("blog/show", { blog: foundBlog});
            //render show template with that campground
            
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.isHostLogin, function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        tags = foundBlog.tags;
        var json = tags.map(function (value, key) {
            return {
                "value": value
            }
        });
        values = JSON.stringify(json);
        res.render("blog/edit", { blog: foundBlog, values: values });
    });
});

router.put("/:id", middleware.isHostLogin, function(req, res){
    // find and update the correct campground
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
            tags = req.body.blog.tags.split(" ");
            Blog.findById(req.params.id, function(err, updatedBlog) {
                if(err) {
                    res.redirect("/blogs");
                }
                else {
                    updatedBlog.tags = tags;
                    updatedBlog.save();
                    res.redirect("/blogs/" + req.params.id);
                }
                
            })
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.isHostLogin, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;