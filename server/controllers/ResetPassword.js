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
                                        {new: true},
        )
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
        //send mail containing the url
        await mailSender(
                           email,
                           "Password Reaste Link",
                           `Password Reset Link : ${url}`  
                        )
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change pwd',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}

exports.resetPassword = async(req, res) => {
    try{
        // fetch data
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword ) {
            return res.status(401).json({
                success: false,
                message: "Password is not match",
            })
        }

        // get user details feom db using token
        const userDetails = await User.findOne({token: token});

        //if no entry in db
        if(!userDetails){
            return res.status.json({
                success: false,
                message: "Token is invalid",
            })
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired, please regenerate your token',
            })
        }

        // hassing password
        const hassedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
            {token: token},
            {password: hassedPassword},
            {new: true},
        )
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        }) 
    }
}