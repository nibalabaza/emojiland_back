var express = require('express');
var router = express.Router();
var gameModel = require('../models').game
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


router.get('/api/games', function(req, res) {
    console.log('Get /games');
    console.log('GET / games req.body', req.body);

    gameModel
    .find({})
    .exec(function(err, games) {
        console.log('GET/ games err', err);
        console.log('GET /games games', games);

        if(err !== null) {
           console.log('Error', err);
           res.json({
               success: false,
               message: err.toString()
           });
           return;
        }
        res.json({
            success: true,
            data: games
        });
    });
});


module.exports = router;