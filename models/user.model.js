const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type:String,
    },

    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }

})

module.exports = mongoose.model("User",userSchema);