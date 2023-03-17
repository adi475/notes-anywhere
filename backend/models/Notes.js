const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const NotesSchema = new Schema(
    {
        name : {
            type : String ,
            required : true
        },

        description : {
            type : String ,
            required : true,
        },

        tag : {
            type : String ,
            default : "general"
        },

        date : {
            type : Date ,
            default : Date.now
        },

    }

);

module.exports = mongoose.model( "notes" , NotesSchema);