const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60, // This means the OTP document will expire after 5 minutes
    }
});

// Define a static method on the schema for sending verification emails
OTPSchema.statics.sendVerificationEmail = async function (email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            emailTemplate(otp)
        );
        console.log("Email sent successfully:", mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending emails:", error);
        throw error;
    }
};

// Execute the sendVerificationEmail method before saving the OTP document
OTPSchema.pre("save", async function (next) {
    if (this.isNew) {
        await this.constructor.sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
