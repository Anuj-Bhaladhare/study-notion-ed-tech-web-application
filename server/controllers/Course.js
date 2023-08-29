const Course = require("../modals/Course");
const Category = require("../modals/Category");
const User = require("../modals/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


// Function to create a new course
exports.createCourse = async(req, res) => {
    try{
		// Get user ID from request object
        const userId = req.user.id;
        
		// Get all required fields from request body
        let { 
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag,
            category,
            status,
            instruction,
        } = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        //validation
        if( 
            !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag || 
            !thumbnail ||
            !category
            ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        if(!status || status === undefined){
            status = "Draft";
        }

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById({category});
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        }

        //Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log(thumbnailImage);

        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
            instruction: instruction,
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

        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);

        // Return the new course and a success message
        return res.status(200).json({
            success:true,
            data:newCourse,
            message:"Course Created Successfully",
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

//getAllCourses handler function
exports.getAllCourses = async(req, res) => {
    try{
        const allCouses = await Course.find({},
               {
                  courseName: true,
                  price: true,
                  thumbnail: true,
                  instructor: true,
                  ratingAndReviews: true,
                  studentsEnrolled: true,
               }
            )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            data: allCouses,
            message: "Data for all courses fetched successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            error:error.message,
            message:'Cannot Fetch course data',
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async(req, res) => {
    try{
        //get id
        const {courseId} = req.body;

        //find course details
        const courseDetail = await Course.find({_id: courseId})
                            .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails",
                                    },
                                }
                            )
                            .populate("category")
                            .populate("ratingAndreviews")
                            .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection",
                                },
                            })
        //validation
        if(!courseDetail) {
            return res.status(400).json({
                success: false,
                message:`Could not find the course with ${courseId}`, 
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}