var mongoose = require ("mongoose");
var types= mongoose.Schema.Types


var game = new mongoose.Schema({

   datetime: {type: Date,
         index: true},

    level: {type: Number,
            index: true},

    region: {type: types.ObjectId, ref: 'region'},

    word: {type: types.ObjectId, ref: 'word'},

   


})

var model = mongoose.model('game', game);

module.exports = model;