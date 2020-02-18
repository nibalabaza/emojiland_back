var mongoose = require("mongoose");


var room = new mongoose.Shema({
  name : {
      type : String,
      index : true,
    },
    
    message : {
        type : String,
        index : true,
    },

    user : {
        type : Array,

    }
})


var model = mongoose.model("room", room);
module.exports = room