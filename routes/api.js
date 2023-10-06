var express = require('express');
const Obj = require('../data/class');
var router = express.Router();

//middleware

const listObj = [];

router.get('/get-all', function (req, res, next) {
  res.send(listObj)
});

router.post('/create', (req, res) => {
  try {
    const data = req.body;
    const newObj = new Obj(data.id, data.title, data.content);
    console.log(newObj);
    listObj.push(newObj)
    res.status(200).send(listObj);
  } catch (error) {
    res.status(500).send('Error');
  }
});

router.put('/update/:id', (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const updatedObj = listObj.find(ob => ob.id == id);
    if (updatedObj) {
      console.log(data);
      updatedObj.title = data.title;
      updatedObj.content = data.content;
      res.status(200).json(updatedObj)
    }
  } catch (error) {
    res.status(500).send(error)
  }
});

router.delete('/delete/:id', (req, res) => {
  try {
    const id = req.params.id
    const objFind = listObj.find(ob => ob.id == id)
    if (objFind !== -1) {
      listObj.splice(objFind, 1);
      res.status(200).send(listObj)
    }
  } catch (error) {
    res.send(error)
  }

});

module.exports = router;
