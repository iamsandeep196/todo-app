const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req,res,next) =>{
    try{

        const token = req.cookies.token;
        // const authHeader = req.headers.authorization;
        
        if(!token){
            return res.status(401).json({
                msg:"Token missings"
            })
        }

        // verify token 
        const decoded = jwt.verify(token,process.env.SECRET_KEY);

        // save user info
        req.user = decoded;

        next();

    }
    catch(error){
        res.status(401).json({
            msg:"Unauthorized",
            error:error.message
        })
    }
}