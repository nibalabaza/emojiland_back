var mongoose   = require ('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');

var log = require('./utils').log


var wordController   = require("./controllers/word");
var userController   = require("./controllers/user");
var gameController   = require("./controllers/game");
var loginController  = require("./controllers/login");
var signupController = require("./controllers/signup");


require('./auth/auth')
require('./goMongoose')()
require('dotenv').config()


var port = process.env.HTTPPORT;
var app = express();


app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use('/api/words',    wordController);
app.use('/api/users',    userController);
app.use('/api/games',    gameController);
app.use('/api/signup', signupController);
app.use('/api/login',   loginController);


app.all('*', function (req, res) {
  console.log(req.originalUrl)
    res.json({
        success: false,
        title: 'Emojiland API',
        message: 'Route is not found'
    });
});


app.listen(port, '0.0.0.0', () => {
  log(`API server listening on ${port}`)
});
