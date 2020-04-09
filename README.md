# bankingApp
A banking app made with node.js express and mongoDB.

To use the API:

In browser: http://localhost:1000/
Followed by route

API returns all accounts as JSON as an array of objects:
{"accounts":[
  {key:value},
  {key:value},
  {key:value}
]}

API Routes:
1. See all accounts (grabs all active user accounts where deleted property= false)

URL: /accounts

Method: GET

2. Add new account

URL: /accounts

Method: POST

Success message: 'Successfully added new account for: (client Name)'

Error message: 'Unable to add new account for this client.'
