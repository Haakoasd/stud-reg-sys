const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    firstname :{
        type:String,
        required:true
    },
    lastname :{
        type:String,
        required:true
    },
    studentId :{
        type:String,
        required:true,
        unique:true
    },
    age :{
        type:Number,
        required:true
    },
    nationality :{
        type:String,
        required:true
    },
    degree :{
        type:String,
        required:true
    },
    date :{
        type:Date,
        required:true
    }
})

// Creating collection

const Register = mongoose.model("Register", studentSchema);

module.exports = Register;