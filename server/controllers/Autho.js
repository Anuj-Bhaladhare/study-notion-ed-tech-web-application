const User = require("../modals/User");
const OTP = require("../modals/OTP");
const otpGenerator = require("otp-generator");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



// OTP generatoe
exports.sendOTP = async(req, res) => {
     try{

        //fetch email from request ki body
        const { email } = req.body;

        // find email in db is allready exist
        const existingEmail = await User.findOne({email});

        //if user already exist , then return a response
        if(existingEmail){
            return res.status(401).json({
                success: false,
                massage: 'User already registered',
            })
        }

        // generate ths uniq OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false, 
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp );

        //check unique otp or not
        let result = await OTP.findOne({otp: otp});

        while(result){
           otp = otpGenerator(6, {
                 upperCaseAlphabets: false, 
                 lowerCaseAlphabets: false,
                 specialChars: false,
            });
         result = await OTP.findOne({otp: otp})
        }

        const otpPayload = {email, otp};

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpPayload);

        // send successfull responce Generat OTP
        res.status(200).json({
            success: true,
            massage: "OTP generate Successfull...!",
            otp,
        })
     }
     catch(error){
        console.log(error);
        return res.status(500).json({
             success: false,
             massage: "OTP is NOT Generate...!",
        })
     }
}


// Sing Up
exports.singUp = async(req, res) => {
    try{

        //data fetch from request ki body
        const {
            firstName,
            lastName, 
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber, 
            otp
        } = req.body;

        // if all details is not present
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success: false,
                massage: "All fields are required",
            })
        }

        
        // check password and conform password is same or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message:'Password and ConfirmPassword Value does not match, please try again',
            });
        }


         //check user already exist or not
        const presentUserSingUp = await User.findOne({email});
        // if user is exist
        if(presentUserSingUp){
            return res.status(400).json({
                success: false, 
                massage: "User is already registered",
            })
        }

        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validate OTP
        if(recentOtp.length == 0){
            return res.status(400).json({
                success: false,
                massage: "OTP Not Found....!",
            })
        }
        else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success: false,
                massage: "Invalid OTP",
            })
        }

        //Hash password
        const bcryptPass = await bycrypt.hash(password, 10);

        // create entry in database
        const profileDetails = {
            gender:null,
            dateOfBirth: null,
            about:null,
            contactNumer:null,
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: bcryptPass,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`, 
        })

        res.status(200).json({
            success: true,
            massage: "User is registered Successfully...!",
            user,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })
    }
}



// Login
exports.login = async(req, res) => {
    try{

        // fetct data from request ki body
        const { email, password } = req.body;

        // check alll data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                massage: "All fields are required, please try again",
            });
        }

        // chack user allready exist
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success: false,
                massage: "User is not registrered, please signup first",
            })
        }
       
        //generate JWT, after password 
        const comparePass = await bycrypt.compare(password, user.password);
        if(comparePass){
           const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, option).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }
    }
    catch(error){
        return res.status(500).json({
             success: false,
             massage: "Login failed",
        })
     }
}




// Forgot Password
exports.changePassword = async(req, res) => {
    try{
        //get data from req body
        const {email, oldPassword, newPassword, conformPassword } = req.body;

        // find user
        const finduser = await User.findOne({email});
        if(!finduser){
            return res.status(403).json({
                success: false,
                massage: "user dose not exist...!",
            })
        }
        // chack old password
        const oldPass = await bycrypt.compare(oldPassword, User.password);
        if(!oldPass){
            return res.status(401).json({
                success: false,
                massage: "old password does not match...!",
            }) 
        }

        //validation
        if(newPassword !== conformPassword){
            return res.status(401).json({
               success: false,
               massage: "newPassword and conformPassword does not match...!",
            })
        }

        const hassPass = await bycrypt.hash(newPassword, 10);

        //update pwd in DB
        const changPass = await User.replaceOne(password, hassPass)
        //send mail - Password updated


        //return response
        res.status(200).json({
            success: true,
            massage: "resate password successfully...!",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            massage: "Login failed",
       })
    }
}