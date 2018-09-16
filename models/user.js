//Require mongoose package
const mongoose = require('mongoose');

//Define UserSchema with title, description and category
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
        type: String,
        required: true,
        default: "user"
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema, 'users');

module.exports.getAll = (callback) => {
    User.find(callback);
}
module.exports.get = (q, callback) => {
    User.findOne(q, callback);
}
module.exports.register = (newUser, callback) => {
    newUser.save(callback);
}
module.exports.delete = (id, callback) => {
    let query = { _id: id };
    User.deleteOne(query, callback);
}