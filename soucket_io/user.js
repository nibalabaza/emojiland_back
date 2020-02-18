var mongoose = require('mongoose');
var userModel= require ('../models/user');

//require('../goMongoose')
mongoose.connect('mongodb://localhost:27017/express-trippy', {
  useNewUrlParser: true,
  useCreateIndex : true,
  useUnifiedTopology: true
},function(err){
    if(err!== null){
        console.log('Connection error err', err);
    }else{
        console.log('DB connected');
    }
});

userModel.findById("5e4433fb8a4d77da59e03e32", function(err, user) {
    console.log('user', user);
    if (err  !== null){
        return null;
    }
    return user;    
});
