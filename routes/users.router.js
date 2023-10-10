const express = require('express');
const { User } = require('../models/user.model');
const router = express.Router();
const jwt = require("jsonwebtoken")
const secretKey = "bien"

router.get('/', async (req, res, next) => {
  try {
    const listUser = await User.find({})
    res.status(200).send(listUser)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.post("/register", async (req, res) => {
  try {
    const userReq = req.body
    // console.log(userReq);
    const userFind = await User.findOne({ email: userReq.email })
    // console.log(userFind);
    if (!userFind) {
      const newUser = new User({ email: userReq.email, password: userReq.password, username: userReq.username })
      await newUser.save();
      res.status(200).send("Create Success!")
    } else {
      res.send("Already exist")
    }

  } catch (error) {
    res.status(500).send(error)
  }
})


router.post('/login', async (req, res) => {
  try {
    const userReq = req.body
    const userFind = await User.findOne({ email: userReq.email, password: userReq.password })
    if (!userFind) {
      res.status(404).send("Not Found!")
    }
    const accessToken = jwt.sign(userFind.toJSON(), secretKey)
    res.cookie("accessToken", accessToken, { httpOnly: true, expires: new Date(Date.now() + 86400 * 1000) })
    res.status(200).send(userFind)
    // console.log(accessToken);
  } catch (error) {
    res.status(500).send(error)

  }
})

module.exports = router;
