var mongoose = require ("mongoose");

var game = new mongoose.Schema({

   datetime: {type: Date,
         index: true},

    level: {type: Number,
            index: true},

    region: {type: mongoose.types.ObjectId, ref: 'region'},

    word: {type: mongoose.types.ObjectId, ref: 'word'},

   


})

var model = mongoose.model('game', game);

module.exports = model;