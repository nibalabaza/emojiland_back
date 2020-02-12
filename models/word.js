//@ts-check

const mongoose = require('mongoose')

const attrTs = require('./attributeTypes')

const wordSchema = new mongoose.Schema({
  'ortho'        : String,
  'phon'         : String,
  'lemme'        : String,
  'cgram'        : String,
  'genre'        : String,
  'nombre'       : String,
  'freqlemfilms' : Number,
  'freqlemlivres': Number,
  'freqfilms2'   : Number,
  'freqlivres'   : Number,
  'infover'      : String,
  'nbhomogr'     : Number,
  'nbhomoph'     : Number,
  'islem'        : Boolean,
  'nblettres'    : Number,
  'nbphons'      : Number,
  'cvcv'         : String,
  'p_cvcv'       : String,
  'voisorth'     : Number,
  'voisphon'     : Number,
  'puorth'       : Number,
  'puphon'       : Number,
  'syll'         : String,
  'nbsyll'       : Number,
  'cv-cv'        : String,
  'orthrenv'     : String,
  'phonrenv'     : String,
  'orthosyll'    : String,
  'cgramortho'   : String,
  'deflem'       : String,
  'defobs'       : String,
  'old20'        : String,
  'pld20'        : String,
  'morphoder'    : String,
  'nbmorph'      : Number,
  'freqlemfilms' : Number,
  'freqfilms'    : Number
})

var Word = mongoose.model('Word', HotelSchema)

module.exports = Word
