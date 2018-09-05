# cisco-npskrm
## API
### ```GET /user/:username```

**Success**
```
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
```
**Fail**
```
{
  "success": false,
  "message": <string>
}
```
### ```POST /user```
```
{
  "success": true | false,
  "message": <string>
}
```
### ```DELETE /user/:id```
```
{
  "success": true | false,
  "message": <string>
}
```
