const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const withAuth = require('../middleware');


// Validate user token
router.get('/checkToken', withAuth, authController.isValid);

// Register new user
router.post('/register', authController.registerNewUser);

// Authenticate user on login
router.post('/authenticate', authController.authenticateCredentials);


module.exports = router;

