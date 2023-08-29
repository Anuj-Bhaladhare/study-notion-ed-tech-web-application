const User = require("../modals/User");
const OTP = require("../modals/OTP");
const otpGenerator = require("otp-generator");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const Profile = require("../modals/Profile");
require("dotenv").config();



// Signup Controller for Registering USers
exports.singUp = async(req, res) => {
    try{

		// Destructure fields from the request body
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

       // Check if All Details are there or not
        if(!firstName || 
            !lastName || 
            !email || 
            !password || 
            !confirmPassword || 
            !otp
            ) {
            return res.status(403).json({
                success: false,
                massage: "All fields are required",
            })
        }

        
        // Check if password and confirm password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message:'Password and ConfirmPassword Value does not match, please try again',
            });
        }


         //check user already exist or not
        const existingUser = await User.findOne({email});
        // if user is exist
        if(existingUser){
            return res.status(400).json({
                success: false, 
                massage: "User already exists. Please sign in to continue.",
            })
        }

        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validate OTP
        if(recentOtp.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                massage: "The OTP is not valid",
            })
        }
        else if(otp !== recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                massage: "The OTP is not valid",
            })
        }

        //Hash the password
        const hashedPassword = await bycrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = {
            gender:null,
            dateOfBirth: null,
            about:null,
            contactNumer:null,
        };

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
        });

        return res.status(200).json({
            success: true,
            user,
            massage: "User is registered Successfully",
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })
    }
}


// Login controller for authenticating users
exports.login = async(req, res) => {
    try{

		// Get email and password from request body
        const { email, password } = req.body;

		// Check if email or password is missing
        if(!email || !password){
            return res.status(400).json({
                success: false,
                massage: "All fields are required, please try again",
            });
        }

		// Find user with provided email
        const user = await User.findOne({email}).populate("additionalDetails")

		// If user not found with provided email
        if(!user){
            return res.status(401).json({
                success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }
       
		// Generate JWT token and Compare Password
        if(await bycrypt.compare(password, user.password)){
            const token = jwt.sign(
                { 
                    email: user.email,
                    id: user._id,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
           );
            
			// Save token to user document in database
            user.token = token;
            user.password = undefined;

           	// Set cookie for token and return success response
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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
             massage: "Login Failure Please Try Again",
        })
     }
}


// Send OTP For Email Verification
exports.sendOTP = async(req, res) => {
    try{

       //fetch email from request ki body
       const { email } = req.body;

        // Check if user is already present
		// Find user with provided email
        const checkUserPresent = await User.findOne({email});
		// to be used in case of signup

		// If user found with provided email
       if(checkUserPresent){
		   // Return 401 Unauthorized status code with error message
           return res.status(401).json({
               success: false,
               massage: 'User is Already Registered',
           })
       }

       // generate ths uniq OTP
       var otp = otpGenerator.generate(6, {
           upperCaseAlphabets: false, 
           lowerCaseAlphabets: false,
           specialChars: false,
       });
       const result = await OTP.findOne({otp: otp});
       console.log("Result is Generate OTP Func");
       console.log("OTP", otp);
       console.log("Result", result);
       while(result){
          otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false, 
                lowerCaseAlphabets: false,
                specialChars: false,
           });
       }

       const otpPayload = { email, otp };
       const otpBody = await OTP.create(otpPayload);
       console.log("OTP Body", otpBody);
       res.status(200).json({
           success: true,
           massage: "OTP Sent Successfully",
           otp,
       });
    } catch(error){
       console.log(error.message);
       return res.status(500).json({
            success: false,
            massage: "OTP is NOT Generate...!",
            error: error.message,
       });
    }
}


// Controller for Changing Password
exports.changePassword = async(req, res) => {
    try{
		// Get user data from req.user
        const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword, conformPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bycrypt.compare(
            oldPassword,
            userDetails.password,
        )

        if(!isPasswordMatch){
			// If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success: false,
                massage: "The password is incorrect",
            })
        }

		// Match new password and confirm new password
        if(newPassword !== conformPassword){
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
               success: false,
               massage: "newPassword and conformPassword does not match...!",
            });
        }

		// Update password
        const encryptedPassword = await bycrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true}
        );

		// Send notification email
        try{
           const emailResponse = await mailSender(
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated seccessfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
			console.log("Email sent successfully:", emailResponse.response);
        } catch(error){
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        //return response
        res.status(200).json({
            success: true,
            massage: "Password updated successfully",
        })
    }
    catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}