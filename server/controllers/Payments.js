const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//initiate the razorpay order
exports.capturePayment = async(res, req) => {
   
    try{
        const { courses } = req.body;
        const userId = req.user.id;

        if(courses.length === 0 ){
            res.status(400).json({
                success: false,
                message: "Course is not found, plxz provide course id",
            })
        }
        
        let totalAmmount = 0;
         for(const course_id of courses){
            let course;
            try{
               course = await Course.findById(course_id);
               if(!course){
                return res.status(200).json({success: false, message: "course not found..."});
               }

               const uid = new mongoose.Types.ObjectId(userId);
               if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({ success: false, message: "students Enrolled"})
               }

               totalAmmount += course.price;
            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: message.error,
                })
            }
         }
    }
    catch(error){
        
    }
}


//verify the payment
exports.verifyPayment = async(res, req) => {
    try{

    }
    catch(error){

    }
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

