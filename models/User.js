const mongoose = require('../db/connection');
const TargetCompany = require("./TargetCompany");
const NetworkingContact = require("./NetworkingContact")

// Schema
const JobSchema = new mongoose.Schema({
    title: String,
    postingURL: String,
    notes: String
});

const TargetCompanySchema = new mongoose.Schema({
    name: String,
    jobs: [ JobSchema ],
    pointOfContact: String,
    icon: String
});

const NetworkingContactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    networksEmail : String,
    notes : String,
    employer : String
});


const UserSchema = new mongoose.Schema({
    userId: String,
    targetCompanies: [ TargetCompanySchema ],
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
    networkingContacts: [ NetworkingContactSchema ]
});

//model
const User = mongoose.model("User", UserSchema);

//export
module.exports = User;
