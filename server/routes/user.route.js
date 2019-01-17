const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// route middleware to verify a token

function isAuthenticated(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

router.post('/signup', function (req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/signin', function (req, res) {
    User.findOne({ email: req.body.email })
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign(
                        {
                            email: user.email,
                            _id: user._id
                        },
                        'secret',
                        {
                            expiresIn: '2h'
                        }
                    );
                    return res.status(200).json({
                        success: true,
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

router.get('/getPopulationStats',isAuthenticated,function(req,res){
    mongoose.connection.db.collection("populationStats", function(err, collection){
        collection.find({}).toArray(function(err, data){
             res.send(data).statusCode(200);
        })
    });
});

router.get('/getGdpStats',isAuthenticated,function(req,res){
    mongoose.connection.db.collection("gdpStats", function(err, collection){
        collection.find({}).toArray(function(err, data){
             res.send(data).statusCode(200);
        })
    });
})


module.exports = router;
