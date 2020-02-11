var mongoose = require ("mongoose");

var gameUser = new mongoose.Schema({

    game: {type: mongoose.Types.ObjectId, ref: 'game'},

    user: {type: mongoose.Types.ObjectId, ref: 'user'},
 
    hasWon: {type:  Object,
            index: true},



})

var model = mongoose.model('gameUser', gameUser);

module.exports = model;