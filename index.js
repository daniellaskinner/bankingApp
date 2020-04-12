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
        const newAccount = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            accountNumber: req.body.accountNumber,
            accountBalance: req.body.accountBalance,
        };
        let status = 500;
        let response = {
            "success": false,
            "message": "Account could not be added."
        };

        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
            let bankDb = client.db('bankingApp');
            let accountAddition = await addNewAccount(bankDb, newAccount);
            if (accountAddition.insertedCount === 1) {
                response.success = true;
                status = 200;
                response.message = 'Successfully added new account for: ' + newAccount.firstName + " " + newAccount.lastName;
                res.status(status).send(response);
            } else {
                response.success = false;
                status = 500;
                response.message = 'Unable to add new account for this client.';
                res.status(status).send(response);
            }
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


// JSON TO TEST BELOW
// {"id":"5e8eed83270adc042416361b", "deposit": "135"}



// //edit account route (for updating balance/adding funds)
//     app.put('/accounts', jsonParser, (req, res) => {
//         const dataToSend = {
//             id: ObjectId(req.body.id),
//             depositToAdd: req.body.deposit
//         };
//         MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
//             let bankDb = client.db('bankingApp');
//
//             let documents = await updateAccountBalance(bankDb, dataToSend)
//                 if (documents.modifiedCount === 1) {
//                     res.send('Successfully updated account balance');
//                 } else {
//                     res.send('Unable to process your deposit.');
//                 }
//                 client.close();
//             });
//     });
//
// // function update account balance
// let updateAccountBalance = async(db, deposit) => {
//     let collection = db.collection('accounts');
//     //increment the account balance by the deposit
//     let result = await collection.updateOne({_id : deposit.id}, {$inc: {accountBalance: deposit.depositToAdd}});
//        return result;
// };


//listener
app.listen(port);