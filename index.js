//set up the app
const express = require('express');
const app = express();
const port = 1000;
app.get('/', (req,res) => {res.send('Hello welcome to the banking app')});

//require in extra node packages
const MongoClient = require('mongodb').MongoClient;
//bring the object id functionality in from mongodb package
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


//display all accounts route
app.get('/accounts', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, async (err, client) => {
        console.log('connected to account database successfully');
        let bankDb = client.db('bankingApp');
        let accounts = await displayAllAccounts(bankDb);
        res.json({"accounts" : accounts});
        });
});

//function get all accounts
let displayAllAccounts = async (db) => {
    let collection = db.collection('accounts');
    let result = await collection.find({deleted:false}).toArray();
    return result;
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


//edit account route (for updating balance/adding funds)
    app.put('/accounts', jsonParser, (req, res) => {
        const dataToSend = {
            id: ObjectId(req.body.id),
            depositToAdd: req.body.deposit
        };
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
            let bankDb = client.db('bankingApp');

            let documents = await updateAccountBalance(bankDb, dataToSend)
                if (documents.modifiedCount === 1) {
                    res.send('Successfully updated account balance');
                } else {
                    res.send('Unable to process your deposit.');
                }
                client.close();
            });
    });

// function update account balance
let updateAccountBalance = async(db, deposit) => {
    let collection = db.collection('accounts');
    //increment the account balance by the deposit
    let result = await collection.updateOne({_id : deposit.id}, {$inc: {accountBalance: deposit.depositToAdd}});
       return result;
};


//listener
app.listen(port);