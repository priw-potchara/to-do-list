require('dotenv').config();
const express = require('express');
const app = express()

const routeToDoList = require('./to-do-list-group');

app.get('/', (req, res) => {
  res.send('Hello World')
})
routeToDoList(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Start server at port ${port}`)
})