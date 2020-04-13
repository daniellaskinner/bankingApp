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


const responseObject = {
    status : 0,
    success: false,
    message: '',
    data: []
};

//display all active accounts route
app.get('/accounts', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, async (err, client) => {
        let bankDb = client.db('bankingApp');
        let accounts = await displayAllAccounts(bankDb);
        let response = responseObject;

        if (accounts.length > 0) {
            response.success = true;
            response.message = 'Accounts successfully retrieved';
            response.data = accounts;
            status=200;
        } else {
            response.success = false;
            response.message = 'Could not retrieve accounts';
            response.data = [];
           response.status=404;
        }
        res.status(response.status).send(response);
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
        const newAccount = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            accountNumber: req.body.accountNumber,
            accountBalance: req.body.accountBalance,
            deleted: false
        };

        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
            let bankDb = client.db('bankingApp');
            let accountAddition = await addNewAccount(bankDb, newAccount);
            let response = responseObject;

            if (accountAddition.insertedCount === 1) {
                response.success = true;
                response.status = 200;
                response.message = 'Successfully added new account for: ' + newAccount.firstName + " " + newAccount.lastName;
            } else {
                response.success = false;
                response.status = 500;
                response.message = 'Unable to add new account for this client.';
            }
            res.status(response.status).send(response);
            await client.close();
        });
    });

//function add account
    let addNewAccount = async (db, newAccountToSend) => {
        let collection = db.collection('accounts');
        //insert json object into the collection
        let result = await collection.insertOne(newAccountToSend);
        return result;
    };


//edit account route (for updating balance/adding funds)
    app.put('/accounts', jsonParser, (req, res) => {
        const dataToSend = {
            id: ObjectId(req.body.id),
            depositToAdd: req.body.deposit
        };

        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
            let bankDb = client.db('bankingApp');
            let updatedBalance = await updateAccountBalance(bankDb, dataToSend);
            let response = responseObject;

            if (updatedBalance.modifiedCount === 1) {
                response.success = true;
                response.status = 200;
                response.message = 'Successfully updated account balance.';
            } else {
                response.success = false;
                response.status = 500;
                response.message = 'Unable to process this deposit, please contact and administrator.';
            }
            res.status(response.status).send(response);
            await client.close();
        });
    });

// function update account balance
let updateAccountBalance = async(db, deposit) => {
    let collection = db.collection('accounts');
    //increment the account balance by the deposit
    let result = await collection.updateOne({_id : deposit.id}, {$inc:{accountBalance: deposit.depositToAdd}});
       return result;
};


//deactivate account route (soft delete)
app.put('/accounts/deactivate', jsonParser, (req, res) => {
    const dataToSend = {
        id: ObjectId(req.body.id),
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        let bankDb = client.db('bankingApp');
        let activationStatus = await deactivateCustomerAccount(bankDb, dataToSend);
        let response = responseObject;

        if (activationStatus.modifiedCount === 1) {
            response.success = true;
            response.status = 200;
            response.message = 'Account successfully deactivated. Please contact an administrator should you wish to reactivate this account.';
        } else {
            response.success = false;
            response.status = 500;
            response.message = 'Unable to deactivate this account, please contact and administrator.';
        }
        res.status(response.status).send(response);
        await client.close();
    });
});

//function to deactivate an account
let deactivateCustomerAccount = async(db, dataToSend) => {
    let collection = db.collection('accounts');
    let result = await collection.updateOne({_id : dataToSend.id}, {$set: {deleted: true}});
    return result;
};


//listener
app.listen(port);