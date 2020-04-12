# bankingApp
A banking app made with node.js express and mongoDB.

To use the API:

In browser: http://localhost:1000

Followed by route

# API Routes:

# See all accounts (grabs all active user accounts where deleted property= false):

URL: /accounts

Method: GET

API returns all accounts as JSON as an array of objects:

```
{"accounts":
[
  {key:value},
  {key:value},
  {key:value}
]}
```


# Add new account:

URL: /accounts

Method: POST

API returns:

Succes: status 200
```
{
    "success": true,
    "message": "Successfully added new account for: (client Name)"
}
```

Failure: status 500
```
{
    "success": false,
    "message": "nable to add new account for this client."
}
```

