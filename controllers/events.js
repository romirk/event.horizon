//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const event = require('../models/event');

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    console.log(`GET ${id}`);
    if (typeof id === 'undefined') {
        event.getAll((err, events) => {
            if (err) {
                res.json({ success: false, message: `Failed to load users. Error: ${err}` });
            }
            else {
                res.json({ success: true, events: events });
                //res.write(JSON.stringify({success: true, users:users},null,2));
                res.end();
            }
        });
    } else {
        event.get({ _id: id }, (err, events) => {
            if (err) {
                res.json({ success: false, message: `Failed to load events. Error: ${err}` });
            }
            else if (!u) {
                res.json({ success: false, message: `Failed to load events. Error: No event with ID ${id}` });
            }
            else {
                res.json({ success: true, events: events });
                res.end();
            }
        });
    }
});

router.post('/', (req, res, next) => {
    let newEvent = new event({
        name: req.body.name,
        date: req.body.date,
        organizers: req.body.organizers,
        participants: req.body.participants,
        details: req.body.details
    });
    console.log(`REG ${newEvent}`);
    event.create(newEvent, (err, e) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new event. Error: ${err}\n ${newEvent}` });

        }
        else
            res.json({ success: true, message: "Added successfully." });
    });
});

module.exports = router;