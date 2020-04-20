const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const withAuth = require('../middleware');


// Get user's profile
router.get('/user', withAuth, userController.getProfile);

// Register new user
router.post('/user', userController.createProfile);

// Update user's profile
router.put('/user', userController.updateProfile);

// Delete user's profile
router.delete('/user', userController.deleteProfile);



module.exports = router;
