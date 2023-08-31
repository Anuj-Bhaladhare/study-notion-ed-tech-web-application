const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({

    email: {
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }

});



// send mail to user
const sendVerificationEmail = async(email, otp) => {
    try{
        const mailResponce = await mailSender(
                                               email, 
                                               "Verification Email from StudyNotion", 
                                               emailTemplate(otp)
                                            );
        console.log("Email send successfully : ", mailResponce.response);
    }
    catch(error){
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    if(this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;