const fs             = require('fs').promises
const raname         = require('random-name')
const mongoose       = require('mongoose')
const passport       = require('passport')
const passportLocal  = require('passport-local')
const passportJwt    = require('passport-jwt')
const jsonwebtoken   = require('jsonwebtoken')
const express        = require('express')
const cors           = require('cors')
const goMongoose     = require('../goMongoose')
const bodyParser     = require('body-parser')
const log            = require('../utils').log
const Word           = require('../models/word.js')

require('dotenv').config()

const {HTTPPORT} = process.env
