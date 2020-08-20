var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var User = require("./models/user");

var blogData = [
    {
        title: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        body: "#### Leetcode 199 \n \n Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        category: "Learning Log",
        tags: [],
        comments: []
    },
    {
        title: "Cloud's Rest",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        body: "#### Leetcode 199 \n \n Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        category: "Learning Log",
        tags: [],
        comments: []
    },
    {
        title: "Cloud's Rest",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        body: "#### Leetcode 199 \n \n Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        category: "Learning Log",
        tags: [],
        comments: []
    }
]

var userData = [
    {
        username: "Jiaqian Sun",
        password: "123456",
        label: "Host",
        avatarImageAddress: "https://unsplash.it/180/130?image=1005"
    }
]

var tagData = [
    { name: "spring" },
    { name: "leetcode" },
    { name: "car" },
    { name: "sky" },
    { name: "automobile" }
]

var commentData = [
    { text: "This place is great, but I wish there was internet", author: "Homer" },
    { text: "This place is bad, but I wish there was not internet", author: "Jiaqian" }
]

function seedDB() {
    // remove user
    User.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
    })
        // remove comment
        .then(function () {
            Comment.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        })
        .then(function() {
            Blog.deleteMany({}, function(err) {

            });
        })
        // add new user
        .then(function () {
            userData.forEach(function (seed) {
                User.create(seed, function (err, tag) {
                    console.log("added a user");
                    // add new blog
                    blogData.forEach(function (seed) {
                        User.countDocuments().exec(function (err, count) {
        
                            // Get a random entry
                            var random = Math.floor(Math.random() * count)
        
                            // Again query all users but only fetch one offset by our random #
                            User.findOne().skip(random).exec(
                                function (err, result) {
                                    // Tada! random user
                                    seed.author = result;
                                });
                        });
                        Comment.countDocuments().exec(function (err, count) {
        
                            // Get a random entry
                            var random = Math.floor(Math.random() * count)
        
                            // Again query all users but only fetch one offset by our random #
                            Comment.findOne().skip(random).exec(
                                function (err, result) {
                                    // Tada! random user
                                    seed.comments.push(result);
                                })
                        });
                        for (i = 0; i < 2; i++) {
                            seed.tag.push(tagData[Math.floor(Math.random() * tagData.length)]);
                        }
                        Blog.create(seed, function(err, blog) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("added a blog");
                            }
                        })
                    });
                })
            });
        })
        

    // Tag.remove({}, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("removed tags!");
    //     tagData.forEach(function (seed) {
    //         Tag.create(seed, function (err, tag) {
    //             console.log("added a tag");
    //         })
    //     });
    // })
    //     .then(function () {
    //         User.remove({}, function (err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             console.log("removed users!");
    //             userData.forEach(function (seed) {
    //                 User.create(seed, function (err, tag) {
    //                     console.log("added a user");
    //                 })
    //             });
    //         })
    //             .then((function () {
    //                 Blog.remove({}, function (err) {
    //                     if (err) {
    //                         console.log(err);
    //                     }
    //                     console.log("removed blogs!");
    //                     //add a few blogs
    //                     blogData.forEach(function (seed) {
    //                         Blog.create(seed, function (err, blog) {
    //                             if (err) {
    //                                 console.log(err)
    //                             } else {
    //                                 console.log("added a blog");
    //                                 //create a comment
    //                                 Comment.create(
    //                                     {
    //                                         text: "This place is great, but I wish there was internet",
    //                                         author: "Homer"
    //                                     }, function (err, comment) {
    //                                         if (err) {
    //                                             console.log(err);
    //                                         } else {
    //                                             blog.comments.push(comment);
    //                                             console.log("Created new comment");
    //                                             blog.save();
    //                                         }
    //                                     })
    //                                 // Tag.count().exec(function (err, count) {
    //                                 //     // Get a random entry
    //                                 //     var random = Math.floor(Math.random() * count);
    //                                 //     // Again query all users but only fetch one offset by our random #
    //                                 //     Tag.findOne().skip(random).exec(
    //                                 //         function (err, result) {
    //                                 //             // Tada! random user
    //                                 //             blog.tags.push(result);
    //                                 //         });
    //                                 // });
    //                                 // User.count().exec(function (err, count) {
    //                                 //     // Get a random entry
    //                                 //     var random = Math.floor(Math.random() * count);
    //                                 //     // Again query all users but only fetch one offset by our random #
    //                                 //     User.findOne().skip(random).exec(
    //                                 //         function (err, result) {
    //                                 //             // Tada! random user
    //                                 //             blog.author = result;
    //                                 //             blog.save();
    //                                 //             console.log(blog);
    //                                 //         });
    //                                 // });
    //                             }
    //                         });
    //                     });
    //                 });
    //             }));
    //     });
}

module.exports = seedDB;