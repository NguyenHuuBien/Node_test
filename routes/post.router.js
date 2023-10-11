const express = require("express");
const app = express();
const { Post } = require("../models/post.model");
const router = express.Router();
const jwt = require("jsonwebtoken")
const secretKey = "bien"

router.get("/get-all", async (req, res) => {
    try {
        const lisPost = await Post.find({})
        res.status(200).send(lisPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Create Post using Token
router.post("/create", async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        const tokenDecode = jwt.verify(accessToken, secretKey)
        const id = tokenDecode._id
        // console.log(tokenDecode);
        const postData = req.body
        const newPost = Post({ ...postData, user: { _id: id, email: tokenDecode.email, username: tokenDecode.username } })
        await newPost.save()
        // console.log(tokenDecode);
        res.status(200).send(newPost)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id
        const updateData = req.body
        const postFind = await Post.findById(id)
        postFind.set(updateData)
        await postFind.save()
        res.status(200).send(postFind)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        await Post.deleteOne({ _id: id })
        res.status(200).send("Delete True")
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router