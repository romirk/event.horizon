# cisco-npskrm
## API
### ```GET /user/:username```

**Success**
```
//for multiple users
{
  "success": true,
  "users": [
    {
      "status": <int>,
      "_id": <id>,
      "name": <string>,
      "email": <string>,
      "pass": <string>,
      "grade": <int>,
      "sec": <string>
    }
  ]
}

//for single user
{
  "success": true,
  "user": {
      "status": <int>,
      "_id": <id>,
      "name": <string>,
      "email": <string>,
      "pass": <string>,
      "grade": <int>,
      "sec": <string>
    }
}
```
**Fail**
```
{
  "success": false,
  "message": <string>
}
```
### ```POST /user/new```
```
{
  "success": true | false,
  "message": <string>
}
```
### ```POST /user/edit/:id```
```
{
  "success": true | false,
  "user": {
    "status": <int>,
    "_id": <id>,
    "name": <string>,
    "email": <string>,
    "pass": <string>,
    "grade": <int>,
    "sec": <string>
  }
}
```
### ```DELETE /user/:id```
```
{
  "success": true | false,
  "message": <string>
}
```
