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

//display all accounts route
app.get('/accounts', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        console.log('connected to account database successfully');
        let bankDb = client.db('bankingApp');
        displayAllAccounts(bankDb, (documentsReturned) => {
            res.json(documentsReturned);
        });
    });
    });

//function get get all accounts
var displayAllAccounts = (db, callback) => {
    var collection = db.collection('accounts');
    collection.find({}).toArray((err, documents) => {
        console.log('found the following accounts');
        callback(documents);
    })
};






app.listen(port, () => {console.log(`Banking app listening at http://localhost:${port}`)});
