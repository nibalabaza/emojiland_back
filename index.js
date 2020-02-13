var mongoose = require ('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var userModel = require('./models/user');

var wordsController = require("./controllers/words");
var userController = require("./controllers/user");
var gameController = require("./controllers/game");

mongoose.connect(
    'mongodb://localhost:27017/emojiland',{
        useNewParser: true,
        useUnifiedTopology: true
    },
    function (err) {
        if (err !== null) {
            console.log('DB connected Failed');
            return;
        }
        console.log('DB connected');
    }
);

var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/words', wordsController);
app.use('/user', userController);
app.use('/game', gameController);



app.all('*', function (req, res) {
    res.json({
        success: false,
        title: 'Emojiland API',
        message: 'Route is not found'
    });
});

app.listen(port, function () {
    console.log('Server started on port:',port);
});