
const mongoose = require('../db/connection');

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


//model
const TargetCompany = mongoose.model("TargetCompany", TargetCompanySchema);

//export
module.exports = TargetCompany;
