const subSection = require("../modals/SubSection");
const Section = require("../modals/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config().
// create subsection 
exports.createSubSection = async(req, res) => {
    try{
        //fecth data from Req body
        const { sectionId, title, timeDuration, description } = req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        //create a sub-section
        const subSectionDetails = await subSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        //update section with this sub section ObjectId
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{
                                                                subSection:subSectionDetails._id,
                                                            }},
                                                            {new:true});
        //HW: log updated section here, after adding populate query

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub Section Created Successfully",
        });
    }
    catch(error){
        return res.status(200).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}


//HW: updateSubSection

//HW:deleteSubSection