//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const event = require('../models/event');

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

router.use(cors({ origin: '*' }));

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    console.log(`GET ${id}`);
    if (typeof id === 'undefined') {
        event.getAll((err, events) => {
            if (err) {
                res.json({ success: false, message: `Failed to load users. Error: ${err}` });
            }
            else {
                res.status(200).json({ success: true, events: events });
                //res.write(JSON.stringify({success: true, users:users},null,2));
                res.status(200).end();
            }
        });
    } else {
        event.get({ _id: id }, (err, events) => {
            if (err) {
                res.json({ success: false, message: `Failed to load events. Error: ${err}` });
            }
            else if (!events) {
                res.json({ success: false, message: `Failed to load events. Error: No event with ID ${id}` });
            }
            else {
                res.status(200).json({ success: true, events: events });
                res.status(200).end();
            }
        });
    }
});

router.post('/', (req, res, next) => {
    let newEvent = new event({
        name: req.body.name,
        date: req.body.date,
        organizers: req.body.organizers,
        type: req.body.type,
        venue: req.body.venue,
    });
    //var id = newEvent._id;
    if (req.body.participants) newEvent.participants = req.body.participants;
    if (req.body.details) newEvent.details = req.body.details;

    console.log(`REG ${newEvent}`);
    event.create(newEvent, (err, id) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new event. Error: ${err}\n ${newEvent}` });

        }
        else
            res.status(200).json({ success: true, message: "Added successfully.", id: newEvent._id});
    });
});
router.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    let update = req.body.update;
    event.edit({ _id: id }, update, (err, updatedUser) => {
        if (err) {
            res.json({ success: false, message: `Failed to update event. Error: ${err}\n ${update}` });
        }
        else if (!updatedUser) {
            res.json({ success: false, message: `Failed to update user. Error: No user with id ${id}` });
        }
        else {
            res.json({ success: true, user: updatedUser });
            res.end();
        }
    })
});

router.post('delete/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    console.log(`DELETE\t${id}`);
    //Call the model method delete
    event.delete(id, (err, e) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the user. Error: ${err}` });
        }
        else if (e) {
            res.status(200).json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    })
});
module.exports = router;