const express = require("express");
const router = express.Router();
const User = require("../models/User")
const jwt = require('jsonwebtoken');
const userController = require("../controllers/users")
require('dotenv').config();
const secret = process.env.SECRET;

const withAuth = require('../middleware');


router.get('/home', function(req, res) {
    res.send('Welcome!');
});

router.get('/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

// POST route to register a user
router.post('/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
        if (err) {
            res.status(500)
                .json({
                    status: 500,
                    error: "Error registering new user please try again."
                });
        } else {
            res.status(200).json({
                status: 200,
                message : "Welcome to the club!"
            });
        }
    });
});


router.post('/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    status: 500,
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    status: 401,
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({
                            status: 500,
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            status: 401,
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    const options = {
                        headers: {
                            "Access-Control-Allow-Origin": "https://mighty-tundra-18136.herokuapp.com/api/authenticate",
                        },
                        httpOnly: true
                    }
                    /*
                        One particular things to note here is that when we issued
                         the token, we set it as a cookie and set the httpOnly
                         flag to true . This method of issuing tokens is ideal
                         for a browser environment because its sets an httpOnly
                         cookie which helps secure the client from certain
                         vulnerabilities such as XSS.
                     */
                    res.cookie('token', token, options)
                        .status(200).json({
                            status: 200,
                            message:"User Authenticated"
                    })
                }
            });
        }
    });
});

module.exports = router;

