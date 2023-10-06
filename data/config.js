const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Node_test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((error) => {
        console.log("Error Connect: ", error);
    })

const UserSchema = new mongoose.Schema({
    username: String
})
const User = mongoose.model('user', UserSchema);


const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
const Post = mongoose.model('Post', PostSchema);


module.exports = {
    mongoose,
    User,
    Post
}