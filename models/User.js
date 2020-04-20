const mongoose = require('../db/connection');
const TargetCompany = require("./TargetCompany");
const NetworkingContact = require("./NetworkingContact")


// schema
const UserSchema = new mongoose.Schema({
    userId: String,
    targetCompanies: [ TargetCompany ],
    jobSearchMaterials: {
        brandStatement: String,
        coverLetter: String,
        resume: String,
        gitHub: String,
        linkedIn: String,
        repl: String,
        codeSandBox: String,
        profileSite: String
    },
    networkingContacts: [ NetworkingContact ]
});

//model
const User = mongoose.model("User", UserSchema);

//export
module.exports = User;
