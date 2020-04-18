// import mongoose
const mongoose = require("mongoose");

// using native ES6 Promises, in place of mongoose's deprecated mpromise library
mongoose.Promise = Promise;

// set the uri for connecting to our local mongodb
let mongoURI = "";
if(process.env.MONGODB_URI){
    mongoURI = process.env.MONGODB_URI
} else{
    mongoURI = "mongodb://localhost/authdb"
}

// connect to the database, with the imported mongoose instance
mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(instance => {
        console.log(`Connected to db: ${instance.connections[0].name}`)
    }).catch(error => {
    console.log(`Connection failed. ERROR: ${error}`)
});

// export mongoose
module.exports = mongoose;
