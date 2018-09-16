//Require mongoose package
const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: Date,
    organizers: {
        type: [{
            type: String
        }],
        required: true
    },
    participants: [{
        type: String
    }],
    details: String
});

const Event = module.exports = mongoose.model('Event', EventSchema, 'events');

module.exports.getAll = (callback) => {
    Event.find(callback);
}
module.exports.get = (q, callback) => {
    Event.findOne(q, callback);
}
module.exports.create = (newEvent, callback) => {
    newEvent.save(callback);
}
module.exports.delete = (id, callback) => {
    let query = { _id: id };
    Event.deleteOne(query, callback);
}