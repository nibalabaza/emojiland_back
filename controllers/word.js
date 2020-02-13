//@ts-check

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Word = require('../models/word')
const buildReply = require('../utils').buildReply
const log = require('../utils').log


router.get('/', function(req, res){
  log('GET /api/words')
  Word.find({freqlemfilms: { $lte: 1000}}, 'ortho').limit(500)
      .then( xs => res.json(pick(xs)) )
})

module.exports = router;
