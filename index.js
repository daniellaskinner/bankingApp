//set up the app
const express = require('express');
const app = express();
const port = 1000;
app.get('/', (req,res) => {res.send('Hello welcome to the banking app')});

//require in extra node packages
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();








app.listen(port, () => {console.log(`Banking app listening at http://localhost:${port}`)});
