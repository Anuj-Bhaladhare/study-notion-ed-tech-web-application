const User = require("../modals/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


exports.resetPasswordToken = async(req, res) => {
    try{
        // get email from request body
        const email = req.body.email;

        // check email is present or not
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Your Email is not registered with us",
            })
        }

        // if user present , Generat the token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updateDetails = await User.findByIdAndUpdate(
                                        {email: email},
                                        {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new: true};
        )
    }
    catch(error){

    }
}

exports.resetPassword = async(req, res) => {
    try{

    }
    catch(error){
        
    }
}