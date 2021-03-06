var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    category: String,
    status: {type: String, default: "finished"},
    views: {type: Number, default: 0},
    date: { type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    tags: [String],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

blogSchema.index({'$**': 'text'});

module.exports = mongoose.model("Blog", blogSchema);
