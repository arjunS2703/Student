const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        
    },
    
    email:{
        type:String,
       
       
    },
    password:{
        type:String,
       
    },

    rollno:{
        type:Number,
      

    },

    gender:{
        type:String,
       

    },

    phone:{
        type:Number,
       
    },

    sem: { type: Schema.Types.ObjectId, ref: "semester" },
  branch: { type: Schema.Types.ObjectId, ref: "branch"}

    
})
studentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('student',studentSchema)