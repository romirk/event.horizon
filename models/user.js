//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    sec: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default:2
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

//BucketList.find() returns all the lists
module.exports.getAll = (callback) => {
    User.find(callback);
}
module.exports.get = (q, callback) => {
    User.findOne(q, callback);
}
//newList.save is used to insert the document into MongoDB
module.exports.register = (newUser, callback) => {
    newUser.save(callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.delete = (id, callback) => {
    let query = {_id: id};
    User.deleteOne(query, callback);
}