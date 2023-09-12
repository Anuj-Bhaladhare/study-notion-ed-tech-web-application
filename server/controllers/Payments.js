const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const crypto = require("crypto");


//initiate the razorpay order
exports.capturePayment = async(res, req) => {
   
        const { courses } = req.body;
        const userId = req.user.id;

        if(courses.length === 0 ){
            return res.json({success:false, message: "Please provide Course Id"})
        }
        
        let totalAmmount = 0;

        for(const course_id of courses){
            let course;
            try{
               course = await Course.findById(course_id);
               if(!course){
                return res.status(200).json({success: false, message: "Could not find the course"});
               }

               const uid = new mongoose.Types.ObjectId(userId);
               if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({ success: false, message: "Student is already Enrolled"});
               }

               totalAmmount += course.price;
            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        }

        const currency = "INR";
        const options = {
            amount: totalAmmount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            res.json({
                success: true,
                message: paymentResponse,
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({success:false, mesage:"Could not Initiate Order"});    
        }
}


//verify the payment
exports.verifyPayment = async(res, req) => {

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
       !razorpay_payment_id ||
       !razorpay_signature ||
       !courses ||
       !userId) {
            return res.status(200).json({success: false, message: "Payment Failed"})
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        //enroll karwao student ko
        await enrollStudents(courses, userId, res);
        //return res
        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(200).json({success:"false", message:"Payment Failed"});
}



exports.enrollStudents = async(res, req) => {
    try{

    }
    catch(error){

    }
}



exports.sendPaymentSuccessEmail = async(res, req) => {
    try{

    }
    catch(error){

    }
}

