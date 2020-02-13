var mongoose = require ("mongoose");
var types= mongoose.Schema.Types

var help = new mongoose.Schema({

    user: {type: types.ObjectId, ref: 'user'},

    datetime: {type:  Date,
               index: true},
 
    region: {type: types.ObjectId, ref: 'region'},



})

var model = mongoose.model('help', help);

module.exports = model;