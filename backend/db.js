const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?directConnection=true"

// to overcome the mongoose deprecation warning.
mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI , () =>{
        console.log("connected to mongo database successfully")
    })
} 

module.exports = connectToMongo ;