var mongoose   = require ('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var fs = require('fs');

var log = require('./utils').log


var app = require('http');
//var io = require('socket.io');

var wordController   = require("./controllers/word");
var userController   = require("./controllers/user");
var gameController   = require("./controllers/game");
var loginController  = require("./controllers/login");
var signupController = require("./controllers/signup");


require('./auth/auth')
require('./goMongoose')()
/**mongoose will call the function "go" to connect with the database and it will eccute it directly */
require('dotenv').config()


var port = process.env.HTTPPORT;
var app = express();


app.use(cors({origin: '*'}))
/**to verify the source of the request of the API .To do "CROSS-ORIGIN RESOURCE sharing"  */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use('/api/words',   wordController);
app.use('/api/users',   userController);
app.use('/api/games',   gameController);
app.use('/api/signup',  signupController);
app.use('/api/login',   loginController);


// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
// io.on('connection', function (socket) {
//     socket.emit('news', {user: "user is connected"});
//     socket.on('my oyher event', function (data) {
//         console.log(data);
//     })
// })

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  /**the user will send a letter */
  
  app.post('/messages', (req, res) => {
    var message = new Message({type: gameUpdate,
                                mot: "fleur",
                                validLetter: "",
                                relmainigLetter: [],
                                health: 0
                            });
    message.save((err) =>{
      if(err)
        sendStatus(500);
      //io.emit('message', message);
      res.sendStatus(200);
    })
  })

  /**the server will send the answer */
  
  /*
  io.on('connection', () =>{
    console.log('a user is connected')
  })
  */


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

/** All of the IP addresses match "0.0.0.0." */
