var mongoose = require ("mongoose");

var user = new mongoose.Schema({

    firstName: {type: String,
                index: true},

    lastName: {type: String,
                index: true},
 
    email: {type: String,
            index: true},

    avatar: {type: String,
            index: true},

    rights: {type: Object,
            index: true},


})

var model = mongoose.model('user', user);

module.exports = model;