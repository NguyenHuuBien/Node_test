const express = require("express");
const { Post } = require("../models/post.model");
const router = express.Router();

router.get("/get-all", (req, res) => {
    try {
        const lisPost = Post.find({})
        res.status(200).send(lisPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/create/:id", async (req, res) => {
    try {
        const id = req.params.id
        const postData = req.body
        const newPost = Post({ ...postData, user: id })
        await newPost.save()
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
        // const deletePost = await Post.findById(id)
        // console.log(deletePost);
        // if (!deletePost) {
        //     return res.status(404).send("Not Found");
        // }
        await Post.deleteOne({ _id: id })
        res.status(200).send("Delete True")
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router