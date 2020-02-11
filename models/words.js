var mongoose = require ("mongoose");

var words = new mongoose.Schema({

    wordName: {type: String,
                index: true},

    difficulty: {type: Number,
                index: true},
 
   

})

var model = mongoose.model('words', words);

module.exports = model;