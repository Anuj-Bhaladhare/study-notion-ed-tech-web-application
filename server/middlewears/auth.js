const User = require("../modals/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// auth
exports.auth = async(req, res, next) => {
    try{
        // extract token
        const token = req.cookies.token || 
                      req.body.token || 
                      req.header("Authorisation").replace("Bearer ", "");

        // if token is not present
        if(!token){
            return res.status(401).json({
                success: false,
                massage: "Token is missing..!"
            })
        }

        // verifying the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.User = decode;
        }
        catch(error){
            res.status(401).json({
            success: false,
            massage: "Token is Invalide...!"
           })
        }
        next();
    }
    catch(error){
        console.log("Error occur in fint Token...!");
        res.status(401).json({
            success: false,
            massage:"Something went wrong while validating the token",
        })
    }
}


// is Student
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                massage: "This is a protected route for Students only"
            });
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            massage: "User role cannot be verified, please try again"
        })
    }
}



// in Instructor
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
           return res.status(401).json({
               success: false,
               massage:"This is a protected route for Instructor only",
           })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            massage: "User role cannot be verified, please try again"
        })
    }
}



// is Admin
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                massage: "This is a protected route for Admin only"
            })
        }
      
    }
    catch(error){
        res.status(500).json({
            success: false,
            massage: "User role cannot be verified, please try again"
        })
    }
}