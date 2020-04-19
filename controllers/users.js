const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const isValid = (req, res) => {
    res.json({
        status: 200,
        message: "Valid user"
    })
};


function isCorrectPassword(enteredPassword, savedPassword, callback) {
    // result is boolean value
    bcrypt.compare(enteredPassword, savedPassword, function (err, result) {
        if(err){
            callback(err)
        } else{
            callback(err, result)
        }
    });
}


const registerNewUser = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app")
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
};


const authenticateCredentials = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app")
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
            isCorrectPassword(password, user.password, function(err, same) {
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
                    res.status(200).json({
                        status: 200,
                        message:"User Authenticated",
                        token: token
                    })
                }
            });
        }
    });
};

module.exports = {
    registerNewUser,
    authenticateCredentials,
    isValid
};