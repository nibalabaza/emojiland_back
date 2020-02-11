//@ts-check

var mongoose = require('mongoose')
var utils = require('./utils')

var dbPort = 27017

var mongoURI = process.env.MONGODB_URI ||
    `mongodb://localhost:${dbPort}/trippy_basics`


var mongoOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}


function dbConnectRet(err){
  if (err !== null) {
    console.log('Dabatase connection err', err);
    process.exit(1); // fatal error
  }
  utils.log(`DB  server listening on ${dbPort}`);
}

function go(){
  mongoose.connect(mongoURI, mongoOpts, dbConnectRet);
}

module.exports = go
