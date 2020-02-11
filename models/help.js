var mongoose = require ("mongoose");

var help = new mongoose.Schema({

    user: {type: mongoose.Types.ObjectId, ref: 'user'},

    datetime: {type:  Date,
               index: true},
 
    region: {type: mongoose.Types.ObjectId, ref: 'region'},



})

var model = mongoose.model('help', help);

module.exports = model;