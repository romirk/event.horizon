const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = module.exports = express();
const port = 8080;

app.use(cors({credentials: true, origin: true}));

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {

    
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});