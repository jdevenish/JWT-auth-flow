const mongoose = require('../db/connection');


// schema
const NetworkingContactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    notes : String,
    employer : String
});

//model
const NetworkingContact = mongoose.model("NetworkingContact", NetworkingContactSchema);

//export
module.exports = NetworkingContact;
