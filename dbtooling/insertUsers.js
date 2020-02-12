const fs             = require('fs').promises
const raname         = require('random-name')
const mongoose       = require('mongoose')
const passport       = require('passport')
const express        = require('express')
const cors           = require('cors')
const goMongoose     = require('../goMongoose')
const bodyParser     = require('body-parser')
const log            = require('../utils').log

require('dotenv').config()

const {HTTPPORT} = process.env

// TENANT DOMAIN
// dev-ax7dehtz.auth0.com

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'superdupersecret'
opts.issuer = 'users.emojiland.winnie'
opts.audience = 'winnie.kaboum'
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
  User.findOne({id: jwt_payload.sub}, function(err, user){
    if(err){
      return done(err, false);
    }
    if(user){
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
}))

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName : String,
  email    : String,
  password : String,
  avatar   : String,
  Rights   : Object
})


const app = express()

goMongoose()
app.use(cors({origin: `http://localhost:${HTTPPORT}`}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())


app.get('/', (req, res) => res.status(404).send('nope'))

app.get('/api/', (req, res) => res.json(
  {
    success: true,
    data   : 'emojiland api ready'
  }
))


app.get('/api/words', (req, res) => {  
})

var User = new mongoose.model('User', userSchema)
app.get('/users', async (req, res) => {
  console.log('GET /users')
  User.find(null, null, {})
    .then( xs => res.json(xs) )
    .catch( err => res.json(err) )
})


app.get('/api/users',
	passport.authenticate('jwt', { session: false }),
	function(req, res){
	  if(res !== null){
	    console.log('res is not null')
	    res.json('{success: false}')
	  }else{
	    res.json('{success: true}')
	  }
	}
)


app.listen(HTTPPORT, () => {
  log(`API server listening on ${HTTPPORT}`)
});


function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
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
