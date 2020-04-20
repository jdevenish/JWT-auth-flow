const mongoose = require('../db/connection');
const bcrypt = require('bcrypt');


// schema
const AuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// hash password before sending to db
const saltRounds = 10;
AuthSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

//model
const Auth = mongoose.model("Auth", AuthSchema);

//export
module.exports = Auth;