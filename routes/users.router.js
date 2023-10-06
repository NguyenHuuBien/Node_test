const express = require('express');
const router = express.Router();
const user = require("../models/user.model")

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const listUser = await user.User.find({})
    res.status(200).send(listUser)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new user.User(req.body)
    await newUser.save()
    res.status(200).send("Create User Success")
  } catch (error) {
    res.status(500).send(eror)
  }
})

module.exports = router;
