const Section = require("../modals/Section");
const Course = require("../modals/Course");

exports.createSection = async(req, res) => {
    try{
        //  Fetch data
        const {sectionName, courseId} = req.body;

        // data velidation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing Properties, all field is required..!"
            })
        }

        // create section
        const newSection = await Section.create({sectionName});

        //update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                       courseId,
                                       {
                                            $push:{
                                                courseContent: newSection._id,
                                            }
                                       } ,
                                       {new: true},
                                    );
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create section, plz try again letter...!",
            error: error.message,
        })
    }
}



exports.updateSection = async(req, res) => {
    try{
        // Fetch data
        const {sectionName, sectionId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status.json({
                success: false,
                message: "Missing Properties",
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to Update section, plz try again letter...!",
            error: error.message,
        }) 
    }
}



exports.deleteSection = async(req, res) => {
    try{

        //get ID - assuming that we are sending ID in params
        const {sectionId} = req.params

        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[Testing]: do we need to delete the entry from the course schema ??
        

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to Delete section, plz try again letter...!",
            error: error.message,
        }) 
    }
}