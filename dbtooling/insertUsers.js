const fs = require('fs').promises
const raname = require('random-name')
const mongoose = require('mongoose')
const passport = require('passport')
const expressSession = require('express-session');

app.use(passport.initialize());
app.use(passport.session());


var userSchema = new mongoose.Schema({
  firstName: String,
  lastName : String,
  email    : String,
  password : String,
  avatar   : String,
  Rights   : Object
})


var userModel = new mongoose.model('User', userSchema)


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function randomAvatar(){
  return `${getRandomInt(0, 3).toString().padStart(2, '0')}.png`
}


function createUser(){
  const firstName = raname.first()
  const lastName  = raname.last()
  const mailRoot = [firstName, lastName]
	.map( s => s.toLowerCase())
	.join('.')
  const email = `${mailRoot}@example.com`
  const avatar = randomAvatar()
  return {
    firstName,
    lastName,
    email,
    avatar,
    rights: {},
  }
}


async function createUserJSON(nb){
  const res = [... new Array(nb)].map( _ => createUser() )
  await fs.writeFile('users.json', JSON.stringify(res))
}

//createUserJSON(100)

// mongoimport -d emojiland -c users --jsonArray users.json 
