const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        email: String,
        username: String
    }
})
const Post = mongoose.model('Post', PostSchema);
module.exports = {
    Post
};