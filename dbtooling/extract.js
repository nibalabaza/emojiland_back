const fs = require('fs').promises
const d3 = require('d3-dsv')
const mongoose = require('mongoose')

path = './Lexique383.tsv'

var dbPort = 27017

var mongoURI = process.env.MONGODB_URI ||
    `mongodb://127.0.0.1:${dbPort}/emojiland`

const wordSchema = new mongoose.Schema({
  ortho: String,
  phon:  String,
  lemme: String,
  cgram: String,
  genre: String,
  nombre: String,
  freqlemfilms: Number,
  freqlemlivres: Number,
  freqfilms2: Number,
  freqlivres: Number,
  infover: String,
  nbhomogr: Number,
  nbhomoph: Number,
  islem: Boolean,
  nblettres: Number,
  nbphons: Number,
  cvcv: String,
  p_cvcv: String,
  voisorth: Number,
  voisphon: Number,
  puorth: Number,
  puphon: Number,
  syll: String,
  nbsyll: Number,
  'cv-cv': String,
  orthrenv: String,
  phonrenv: String,
  orthosyll: String,
  cgramortho: String,
  deflem: String,
  defobs: String,
  old20: String,
  pld20: String,
  morphoder: String,
  nbmorph: Number,
  freqlemfilms: Number,
  freqfilms: Number
})

const Word = new mongoose.model('Word', { word: wordSchema } )

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
  console.log(`DB  server listening on ${dbPort}`);
}

function go(){
  console.log(`Database con attempt @${mongoURI}`)
  mongoose.connect(mongoURI, mongoOpts, dbConnectRet);
}

const shortToLongColName = {
  ortho: 'mot',
  phon: 'formes phonologiques du mot',
  lemme: 'lemmes de ce mot',
  cgram: 'les catégories grammaticales de ce mot',
  genre: 'genre',
  nombre: 'nombre',
  freqlemfilms: 'fréquence du lemmeselon le corpus de sous-titres (par million d’occurrences)',
  freqlemlivres: 'la fréquence du lemme selon le corpus de livres (par million d’occurrences)',
  freqfilms: 'la fréquence du mot selon le corpus de sous-titres (par million d’occurrences)',
  freqlivres: 'la fréquence du mot selon le corpus de livres (par million d’occurrences)',
  infover: 'modes temps, et personnes possibles pour les verbes',
  nbhomogr: 'nombre d\'homographes',
  nbhomoph: 'nombre d\'homophones',
  islem: 'indique si c\'est un lemme ou pas',
  nblettres: 'le nombre de lettres',
  nbphons: 'nombre de phonèmes',
  cvcv: 'la structure orthographique',
  'p-cvcv': 'la structure phonologique',
  voisorth: 'nombre de voisins orthographiques',
  voisphon: 'nombre de voisins phonologiques',
  puorth: 'point d\'unicité orthographique',
  puphon: 'point d\'unicité phonologique',
  syll: 'forme phonologique syllabée',
  nbsyll: 'nombre de syllabes',
  'cv-cv': 'structure phonologique syllabée',
  orthrenv: 'forme orthograhique inversée',
  phonrenv: 'forme phonologique inversée',
  orthosyll: 'forme orthographique syllabée'
}

/*
In place
object[key1] => f(object[key1])
*/
function fkeys(f, keys, object){
  const l = keys.length
  let i = 0
  for(i; i < l; i++){
    object[keys[i]] = f(object[keys[i]])
  }
}

function typerow(row){
  
  fkeys(Number,
	[
	  'freqlemfilms',
	  'freqlemlivres',
	  'freqfilms',
	  'freqlivres',
	  'nbhomogr',
	  'nbhomoph',
	  'nblettres',
	  'nbphons',
	  'voisorth',
	  'voisphon',
	  'puorth',
	  'puphon',
	  'nbsyll',
	  'nbmorph'
	],
	row)
  row['islem'] = Boolean(row['islem'])
}


async function getCategories(){
  console.log('emojiland hangman word extraction')
  console.log('getting source file')
  const contentString = await fs.readFile(path, 'utf-8')
  console.log('parsing tsv content')
  const content = d3.tsvParse(contentString)
  console.log('typing fields')
  content.forEach( typerow )
  console.log('removing superfluous property')
  delete content.columns
  console.log(`found ${content.length} documents`)
  console.log(`document is ${content[0].lemme}`)
  await fs.writeFile('./words.json', JSON.stringify(content))
  process.exit(0)
}


/*
mongoimport -d emojiland -c words --jsonArray words.json 
*/


getCategories()

// users table

// https://replika.ai/
// https://diginoodles.com/projects/eowl
