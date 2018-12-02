const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./controllers/users');
const events = require('./controllers/events');
const config = require('./config/config');
const auth = require('./controllers/authenticate')

mongoose.connect(config.database, { useNewUrlParser: true });


//Initialize our app variable
const app = module.exports = express();

app.use('/user', users);
app.use('/event', events);
app.use('/auth', auth);

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors({credentials: true, origin: true}));

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("<code>Routes:</code><br><code>\\event<\code><br><code>\\user</code>");
});

// Add headers
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