const User = require("../modals/User");
const OTP = require("../modals/OTP");
const otpGenerator = require("otp-generator");




// OTP generatoe
exports.newOtpGenerator = async(req, res) => {
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
           otp = otpGenerator.generate(6, {
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
        return res.status(500).json({
             success: false,
             massage: "OTP is NOT Generate...!",
        })
     }
}


// Sing Up




// Login




// Forgot Password