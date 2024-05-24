require('dotenv').config();
const express = require('express');
const app = express()
const bodyParser = require('body-parser')

const routeToDoListGroup = require('./to-do-list-group');
const routeToDoList = require('./to-do-list');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})
routeToDoListGroup(app);
routeToDoList(app)

app.listen(port, () => {
  console.log(`Start server at port ${port}`)
})