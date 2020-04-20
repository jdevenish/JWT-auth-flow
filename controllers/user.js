const User = require("../models/User");


const getProfile = (req, res) => {
    res.json({
        status: 200,
        message: `Get Profile for ${req.param('token')}`
    })
};

const createProfile = (req, res) => {

    res.json({
        status: 200,
        message: `Create Profile for ${req.param('token')}`
    })
};

const updateProfile = (req, res) => {
    res.json({
        status: 200,
        message: `Update Profile for ${req.param('token')}`
    })
};

const deleteProfile = (req, res) => {
    res.json({
        status: 200,
        message: `Delete Profile for ${req.param('token')}`
    })
};


module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
};