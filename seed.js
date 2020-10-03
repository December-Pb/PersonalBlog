var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var User = require("./models/user");
var dummy = require("mongoose-dummy");

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



function initDB() {
    return mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log("Connected to DB!"))
        .catch(error => console.log(error.message));
}

function cleanDB() {
    console.log("clean DB");
    return User.deleteMany({}).exec()
        .then(() => {
            Comment.deleteMany({}).exec()
        })
        .then(() => {
            Blog.deleteMany({}).exec();
        });
}

function generateFakeData() {

    console.log("generate Data");
    BlogList = [];
    return new Promise((resolve, reject) => {
        for (var i = 0; i < 5; i++) {
            let randomBlog = dummy(Blog, {
                returnDate: true
            });
            BlogList.push(randomBlog)
        }
        resolve(BlogList);
    });
}

function test() {
    initDB()
    .then(() => {
        return cleanDB();
    })
    .then(() => {
        return generateFakeData();
    })
    .then((BlogList) => {
        return BlogList.forEach(element => {
            Blog.create(element)
            // find tags
            .then(() => {
                return Blog.find().distinct("tags", function(errors, tags) {
                    console.log(tags);
                })
            });
        })
    })
}

// test();

// var tagData = [
//     { name: "spring" },
//     { name: "leetcode" },
//     { name: "car" },
//     { name: "sky" },
//     { name: "automobile" }
// ]

// var commentData = [
//     { text: "This place is great, but I wish there was internet", author: "Homer" },
//     { text: "This place is bad, but I wish there was not internet", author: "Jiaqian" }
// ]

// function seedDB() {
//     // remove user
//     User.deleteMany({}, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     })
//         // remove comment
//         .then(function () {
//             Comment.deleteMany({}, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//             })
//         })
//         .then(function() {
//             Blog.deleteMany({}, function(err) {

//             });
//         })
//         // add new user
//         .then(function () {
//             userData.forEach(function (seed) {
//                 User.create(seed, function (err, tag) {
//                     console.log("added a user");
//                     // add new blog
//                     blogData.forEach(function (seed) {
//                         User.countDocuments().exec(function (err, count) {

//                             // Get a random entry
//                             var random = Math.floor(Math.random() * count)

//                             // Again query all users but only fetch one offset by our random #
//                             User.findOne().skip(random).exec(
//                                 function (err, result) {
//                                     // Tada! random user
//                                     seed.author = result;
//                                 });
//                         });
//                         Comment.countDocuments().exec(function (err, count) {

//                             // Get a random entry
//                             var random = Math.floor(Math.random() * count)

//                             // Again query all users but only fetch one offset by our random #
//                             Comment.findOne().skip(random).exec(
//                                 function (err, result) {
//                                     // Tada! random user
//                                     seed.comments.push(result);
//                                 })
//                         });
//                         for (i = 0; i < 2; i++) {
//                             seed.tag.push(tagData[Math.floor(Math.random() * tagData.length)]);
//                         }
//                         Blog.create(seed, function(err, blog) {
//                             if (err) {
//                                 console.log(err)
//                             } else {
//                                 console.log("added a blog");
//                             }
//                         })
//                     });
//                 })
//             });
//         })
// }

module.exports = {
    cleanDB,
    generateFakeData
}