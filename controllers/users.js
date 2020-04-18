const User = require("../models/User");
const bcrypt = require('bcrypt');



const isCorrectPassword = (password, callback) => {
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            console.log("this.password = ", this.password)
            callback(err)
        } else{
            callback(err, same);
        }
    });
};

module.exports = {
    isCorrectPassword
}