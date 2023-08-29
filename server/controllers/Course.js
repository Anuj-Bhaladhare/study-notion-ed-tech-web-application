const Course = require("../modals/Course");
const Tag = require("../modals/Category");
const User = require("../modals/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async(req, res) => {
    try{
        //fetch data 
        const { courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        //TODO: Verify that userId and instructorDetails._id  are same or different ?
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            })
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById({tag});
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Tag Details not found"
            })
        }

        //Upload Image top Cloudinary
        const thumbnailImage = uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYoutWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        )

        //update the TAG ka schema 
        //TODO: HW

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}


// -------------------------------------------------------------
//getAllCourses handler function
exports.showAllCourses = async(req, res) => {
    try{
        //TODO: change the below statement incrementally
        const allCouses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCouses,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}