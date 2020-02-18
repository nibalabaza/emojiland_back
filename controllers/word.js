//@ts-check
const express = require('express')
const router = express.Router()
const passport       = require('passport')
const passportLocal  = require('passport-local')
const passportJwt    = require('passport-jwt')
const jsonwebtoken   = require('jsonwebtoken')
const mongoose = require('mongoose')
const Word = require('../models/word')
const buildReply = require('../utils').buildReply
const log = require('../utils').log

// window.setTimeout(() => window.location.href="/Game", 300000)


function pick(xs){
  const i = Math.floor(Math.random() * xs.length)
  return xs[i]
}
/**to shoose one words */


const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


function words (difficulty){
  var level = difficulty * 100
  Word.find({freqlemfilms: { $gte: level}}, 'ortho').count()
  .then(numWords => Word.find({freqlemfilms: { $gte: level}}).limit(1).skip(3))
  .then( x => console.log('lol') )
}
/**it will send all of the words in terms of their frequency ($gte => greater than or equevalent) */

words()
console.log('lol')

// router.get('/', function(req, res){
//   log('GET /api/words')
//   Word.find({freqlemfilms: { $lte: 1000}}, 'ortho').limit(500)
//     .then( xs => res.json({success: true, data: pick(xs)}) )
// })

// router.get('/level/:level', function(req, res){
//   log('GET /api/words')
//   const level = req.params.level * 1000
//   Word.find({freqlemfilms: { $lte: level}}, 'ortho').limit(500)
//       .then( xs => res.json(pick(xs)) )
// })

module.exports = router;

// the route will send a word for each player ,so it is not the purpose . The purpose is to send one word to all players , so we did a function to choose one word