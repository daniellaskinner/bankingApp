# bankingApp
A banking app made with node.js express and mongoDB.
MongoDB database needed called 'bankingApp', with a collection named 'accounts' connect with localhost:27017

To use the API:

In browser: http://localhost:1000

Followed by route

## API Routes:

### See all accounts
Gets and displays all active user accounts from the db where deleted property= false.

URL: /accounts

Method: GET

API returns a response object as JSON with accounts stored in accountsData property as aan array of objects:

```
{
"status":404,
"success":true,
"message":"Accounts successfully retrieved",
"accountsData":
  [
    {
    "_id":"string",
    "firstName":"string",
    "surName":"string",
    "accountNumber":"string",
    "accountBalance":"number",
    "deleted":"boolean"
    },

    {
    "_id":"string",
    "firstName":"string",
    "surName":"string",
    "accountNumber":"string",
    "accountBalance":"number",
    "deleted":"boolean"
    }
  ]
}
```


### Add new account

Allows user to add new customer account and post this data to the db.

URL: /accounts

Method: POST

API returns:

Success: status 200
```
{
    "status": 200,
    "success": true,
    "message": "Successfully added new account for: (client name)",
    "accountsData": []
}
```

Failure: status 500
```
{
    "status": 500,
    "success": false,
    "message": "Unable to add new account for this client.",
    "accountsData": []
}
```


### Update account balance

Allows user to make a deposit and update their account balance in the db.

URL: /accounts

Method: PUT

API returns:

Success: status 200
```
{
    "status": 200,
    "success": true,
    "message": "Successfully updated account balance."
}
```

Failure: status 500
```
{
    "status": 500,
    "success": false,
    "message": "Unable to process this deposit, please contact and administrator."
}
```
