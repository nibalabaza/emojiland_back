var mongoose = require ('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var userModel = require('./models/user');

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

app.post('api/users', function(req, res){
    console.log('POST /users');
    console.log('POST /users req.body', req.body);

    var user = new UserModel({
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        email: req.body.email || '',
        avatar: req.body.avatar || '',
        rights: req.body.rights || '',
    });
    user.save(function (err, userDb) {
        if(err !== null) {
            console.log('saving user err', err);
            res.json({
                success: false,
                message: err.toString()
            });
            return;
        }
        res.json({
            success: true,
            data: userDb
        });
    });
});


app.get('api/users', function(req, res){
    console.log('GET / users');
    console.log('POST /users req.body', req.body);


    UserModel
    .find({})
    .exec(function (err, users){
        console.log('GET /users err', err);
        console.log('GET /users users', users);
        if (err !== null) {
            console.log('Error', err);
            
            res.json({
                success: false,
                message: err.toString()
            });
            return;
        }
        res.json({
            success: true,
            data: users
        });
    });
});

app.get('/api/users/:id', function(req, res) {
    console.log('GET /users/:id');
    console.log('GET /users/:id req.body', req.body);

    userModel.findById(req.params.id, function(req, user) {
        console.log('GET /users/:id err', err);
        console.log('GET /users/:id user', user);
        if (err  !== null){
            res.json({
                success: false,
                message: err.toString()
            });
            return;
        }
        res.json({
            success: true,
            data: user
        });
    });
});



app.use('*', function (req, res) {
    res.json({
        success: false,
        title: 'Emojiland API',
        message: 'Route is not found'
    });
});

app.listen(port, function () {
    console.log('Server started on port:',port);
});