//@ts-check

const mongoose = require('mongoose')
const utils = require('./utils')

require('dotenv').config()

const { DBPORT, MONGOHOST, DBNAME } = process.env
// /it is connected to the file .env for security

var mongoURI = `mongodb://${MONGOHOST}:${DBPORT}/${DBNAME}`
/*the number of the port and thze name of the project in .env*/ 

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
  utils.log(`DB  server listening on ${DBPORT}`);
}

function go(){
  utils.log(`DB  connection to ${mongoURI}`)
  mongoose.connect(mongoURI, mongoOpts, dbConnectRet);
}


module.exports = go
