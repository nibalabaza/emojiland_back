var express = require('express');
var router = express.Router();
var loginModel = require('../models').login
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.post('/', function(req,res){
    console.log('GET /login');
    console.log('GET /login', req.body);

    var user = new userModel({
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        email: req.body.email || '',
        avatar: req.body.avatar || '',
        rights: req.body.rights || '',
    });

    loginModel.findOne({user:req.body}, function(err, user){
        if (err) {
          console.log('post error: ', err)
          }
        else if (user) {
          console.log("already exsist")
        }
        
    })
})


module.exports = router;