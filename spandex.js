const fs             = require('fs').promises
const raname         = require('random-name')
const mongoose       = require('mongoose')
const passport       = require('passport')
const passportLocal  = require('passport-local')
const passportJwt    = require('passport-jwt')
const jsonwebtoken   = require('jsonwebtoken')
const express        = require('express')
const cors           = require('cors')
const goMongoose     = require('./goMongoose')
const bodyParser     = require('body-parser')
const log            = require('./utils').log
const Word           = require('./models/word.js')

require('dotenv').config()

const {HTTPPORT} = process.env

const app = express()


goMongoose()
app.use(cors({origin: `http://localhost:${HTTPPORT}`}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())


app.get('/api/', (req, res) => res.json(
  {
    success: true,
    data   : 'emojiland api ready'
  }
))


function pick(xs){
  const i = Math.floor(Math.random() * xs.length)
  return xs[i]
}


app.get('/api/words', (req, res) => {
  log('GET /api/wards')
  Word.aggregate([
    {$match:
     {'freqlemfilms': { $lte: 1000 }}},
    {$project:
     {ortho: 1}},
    {$sample:
     {size: 1}}
  ])
    .then( xs => res.json(pick(xs))  )
})


app.listen(HTTPPORT, () => {
  log(`API server listening on ${HTTPPORT}`)
});
