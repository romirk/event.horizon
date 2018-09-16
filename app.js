const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

app.set('SECRET', config.secret);

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

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

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});