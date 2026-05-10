const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();



const connecDB = async () => {
    try {

       await mongoose.connect(process.env.MONGO_URI);
       console.log("Mongo connected!");


    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connecDB;