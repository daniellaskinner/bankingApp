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

API returns a response object as JSON with accounts stored in accountsData property as an array of objects:

Success: status 200
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

Failure: status 404
```
{
  "status": 404,
  "success": false
  "message": "Could not retrieve accounts, please contact an administrator.",
  "accountsData": []
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
  "success": false
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


### Deactivate account

Allows user to deactivate a customer account (soft delete) will update their deleted flag in db to true.

URL: /accounts

Method: PUT

API returns:

Success: status 200
```
{
  "status": 200,
  "success": true,
  "message": "Account successfully deactivated. Please contact an administrator should you wish to reactivate this account."
}
```

Failure: status 500
```
{
  "status": 500,
  "success": false,
  "message": "Unable to deactivate this account, please contact and administrator."
}
```
