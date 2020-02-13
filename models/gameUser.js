var mongoose = require ("mongoose");
var types= mongoose.Schema.Types


var gameUser = new mongoose.Schema({

    game: {type: types.ObjectId, ref: 'game'},

    user: {type: types.ObjectId, ref: 'user'},
 
    hasWon: {type:  Object,
            index: true},



})

var model = mongoose.model('gameUser', gameUser);

module.exports = model;