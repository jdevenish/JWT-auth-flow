const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const withAuth = require('../middleware');


// Validate user token
router.get('/checkToken', withAuth, userController.isValid);

// Register new user
router.post('/register', userController.registerNewUser);

// Authenticate user on login
router.post('/authenticate', userController.authenticateCredentials);


module.exports = router;

