//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const user = require('../models/user');
const config = require('../config/config');

router.post('/', (req, res) => {
    user.get({ username: req.body.username }, (err, u) => {
        console.log(`AUTH\t${req.body.username}`);
        if (err) {
            res.json({ success: false, message: `Authentication failed. Error: ${err}` });
        }
        else if (!u) {
            res.json({ success: false, message: `Authentication failed. Error: No user with username ${req.body.username}` });
        }
        else {
            if (u.pass != req.body.password)
                res.json({ success: false, message: `Authentication failed. Error: Incorrect password` });
            else {
                const payload = {
                    username: u.username,
                    status: u.status
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });
                console.log(`AUTH OK\t${token}`);
                res.json({ success: true, token: token, message: 'Authentication succeded.' });
                res.end();
            }
        }
    })
});
router.post('/verify', (req, res) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(`VERIFY\t${token}`);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.error(`VERIFICATION ERROR ${err}`);
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log(`VERIFY\tOK ${decoded.status}`);
                res.status(200).json({success:true, payload:decoded});
            }
        });
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;
