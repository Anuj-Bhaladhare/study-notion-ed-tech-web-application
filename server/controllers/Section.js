const Section = require("../modals/Section");
const Course = require("../modals/Course");

exports.createSection = async(req, res) => {
    try{
        //  Fetch data
        // data velidation
        // create section
        // user validation

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

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to Delete section, plz try again letter...!",
            error: error.message,
        }) 
    }
}