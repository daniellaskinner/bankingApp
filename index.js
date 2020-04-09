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

//function get all accounts
var displayAllAccounts = (db, callback) => {
    let collection = db.collection('accounts');
    collection.find({}).toArray((err, documents) => {
        console.log('found the following accounts');
        callback(documents);
    })
};

//add account route
app.post('/accounts', jsonParser, (req, res) => {
    //new object to go into db this will be via frontend later on
    const newAccount = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        accountNumber: req.body.accountNumber,
        accountBalance: req.body.accountBalance,
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        console.log('Connected correctly to MongoDb');
        let bankDb = client.db('bankingApp');
        addNewAccount(bankDb, newAccount, (documents) => {
            if(documents.insertedCount === 1){
                res.send('Successfully added new account for: ' + newAccount.firstName + " " + newAccount.lastName);
            } else {
                res.send('Unable to add new account for this client.');
            }
            client.close();
        });
    });
});

//function add account
var addNewAccount = (db, newAccountToSend, callback) => {
    let collection = db.collection('accounts');
    //insert json object into the collection
    collection.insertOne(newAccountToSend, (err, documents) => {
        callback(documents);
    });
};

//listener
app.listen(port, () => {console.log(`Banking app listening at http://localhost:${port}`)});
