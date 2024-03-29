var express = require('express');
var router = express.Router();
var userModel = require('../models').user
var mongoose = require('mongoose');


router.post('/', function(req, res){
    console.log('POST /users');
    console.log('POST /users req.body', req.body);

    var user = new userModel({
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


router.get('/', function(req, res){
    console.log('GET / users');
    console.log('POST /users req.body', req.body);


    userModel
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

router.get('/:id', function(req, res) {
    console.log('GET /users/:id');
    console.log('GET /users/:id req.body', req.params.id);

    userModel.findById(req.params.id, function(err, user) {
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

module.exports = router;