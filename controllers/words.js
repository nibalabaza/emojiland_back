//@ts-check

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Word = require('../models/word')
const buildReply = require('../utils').buildReply
const log = require('../utils').log


router.get('/', function(req, res){
  res.json({foo: "babar"})
})

module.exports = router;