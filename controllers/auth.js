const Auth = require("../models/Auth");
const User = require("../models/User")
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
    res.setHeader("Access-Control-Allow-Origin", "https://ga-job-tracker.netlify.app")
    const { email, password } = req.body;
    const auth = new Auth({ email, password });
    auth.save(function(err) {
        if (err) {
            res.status(500)
                .json({
                    status: 500,
                    error: "Error registering new user please try again.",
                    requestBody: req.body,
                    err: err
                });
        } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
            });
            console.log("Creating new user with ID = ", email.email)
            const newUser = {
                userId: email.email,
                targetCompanies: [],
                networkingContacts: [],
                jobSearchMaterials: {
                    brandStatement: "",
                    coverLetter: "",
                    resume: "",
                    gitHub: "",
                    linkedIn: "",
                    repl: "",
                    codeSandBox: "",
                    profileSite: ""
                }
            };
            User.create(newUser).then(user =>{
                res.status(200).json({
                    status: 200,
                    token: token,
                    userProfile: user
                })
            })
            // res.status(200).json({
            //     status: 200,
            //     message : "Welcome to the club!",
            //     token: token
            // });
        }
    });
};


const authenticateCredentials = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://ga-job-tracker.netlify.app")
    const { email, password } = req.body;
    Auth.findOne({ email }, function(err, auth) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    status: 500,
                    error: 'Internal error please try again'
                });
        } else if (!auth) {
            res.status(401)
                .json({
                    status: 401,
                    error: 'Incorrect email or password'
                });
        } else {
            isCorrectPassword(password, auth.password, function(err, same) {
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
                    User.findOne({"userId": payload.email}).then(user => {
                        res.status(200).json({
                            status: 200,
                            token: token,
                            userProfile: user
                        })
                    })

                    //
                    // res.status(200).json({
                    //     status: 200,
                    //     message:"User Authenticated",
                    //     token: token
                    // })
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