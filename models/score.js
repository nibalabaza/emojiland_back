var mongoose = require ("mongoose");

var score = new mongoose.Schema({

    game: {type: mongoose.Types.ObjectId, ref: 'game'},

    user: {type: mongoose.Types.Object, ref: 'user'},
 
    points: {type:  Number,
            index: true},
dj


})

var model = mongoose.model('score', score);

module.exports = model;