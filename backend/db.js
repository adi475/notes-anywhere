const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/notesAnywhere?directConnection=true"

// to overcome the mongoose deprecation warning.
mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI , () =>{
        console.log("connected to mongo database successfully")
    })
} 

module.exports = connectToMongo ;