var mongoose = require ("mongoose");

var region = new mongoose.Schema({

   name: {type: String,
         index: true},

    typeRej: {type: String,
             index: true},


})

var model = mongoose.model('region', region);

module.exports = model;