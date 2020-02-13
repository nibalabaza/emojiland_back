var mongoose = require ("mongoose");
var types= mongoose.Schema.Types


var score = new mongoose.Schema({

    game: {type: types.ObjectId, ref: 'game'},

    user: {type: types.ObjectId, ref: 'user'},
 
    points: {type:  Number,
            index: true},



})

var model = mongoose.model('score', score);

module.exports = model;