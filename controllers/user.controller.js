const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { registerValidation , loginValidation }= require("../validations/user.validation");

// user register controller
exports.registerUser = async (req,res) => {

    try {
        // validate req.body
    const { error } = registerValidation.validate(req.body);
    if(error) return res.status(400).json({
        success:false,
        msg:error.details[0].message
    })

    const { name , email , password } = req.body;
    const existUser = await User.findOne({email});
    if(existUser) return res.status(409).json({
        success : false,
        msg : "Email already exists"

    })
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name:name,
        email:email,
        password:hashPassword,
    })
    res.status(200).json({msg : "User resgistered successfully"});

} catch (error){
    res.status(500).json({msg:"Internal server error"});
}


}

// user login controller
exports.loginUser = async (req,res) => {
    try {

        // validations 

        const { error } = loginValidation.validate(req.body);

        if(error) return res.status(400).json({
            success:false,
            msg:error.details[0].message
        });

        const { email , password } = req.body;
    
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({msg:"User not found"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({msg:"Invalid credentials"});

        const token = jwt.sign(
            {
                id:user._id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"7d"
            }
        );


        // set cookies 
        res.cookie("token",token);

        res.status(200).json({
            msg:"Login successful"
        })


    }catch(error){
        res.status(500).json({
            msg:"Internal server error"
        })

    }
}

// logout user controller
exports.logoutUser = async (req,res) => {
    try {

        res.clearCookie("token");

        res.status(200).json({
            msg:"Logout succesful"
        })

    }
    catch (error){
        res.status(500).json({
            msg:"Logout failed"
        })
    }
}

// user forgot-password controller
exports.forgotPassword = async (req,res) => {
    
    try {

        const { email } = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(404).json({msg:"User not found"});

        // generate token 

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 1 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:3000/api/reset-password/${resetToken}`;

        // console.log(resetUrl);

        res.status(200).json({
            success:true,
            msg:"Password reset link sent",
            resetUrl
        })


    } 
    catch (error){

        res.status(500).json({
            msg:"Internal server error"
        })

    }
}

// user reset-password controller
exports.resetPassword = async (req,res) => {
    try {
        const { token } = req.params;
      
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpires: { $gt: Date.now()}
        })

        if(!user) return res.status(400).json({
            msg:"Invalid or expire"
        })

        // hashpassword new password
        const hashPassword = await bcrypt.hash(password,10);
        user.password = hashPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            msg:"Password reset successful"
        })
    }
    catch (error){


        res.status(400).json({
            msg:"Invalid or expire token "
        })

    }

}