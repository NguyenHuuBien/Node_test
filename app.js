const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const port = 3000;

mongoose.connect('mongodb://localhost/Node_test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error Connect: ", error);
  })


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


const postsRouter = require('./routes/post.router');
const usersRouter = require('./routes/users.router');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
