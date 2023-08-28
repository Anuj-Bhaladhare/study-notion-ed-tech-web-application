const Profile = require("../modals/Profile");
const User = require("../modals/User");


exports.updateProfile = async(req, res) => {
    try{
        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get User Id
        const id = req.user.id;

        // validation
        if(!contactNumber || !gender || !id ){
            return res.status(400).json({
                success: false,
                message: "All field are require...!",
            })
        }

        // find Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // Upadte Profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        // return responce
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Profile is Not Update...!",
            error: error.message,
        })
    }
}



exports.deleteAccount = async(req, res) => {
    try{
        //get id 
        const id = req.user.id

        //validation
        const userDetails = await User.findById(id);
        if(!id || userDetails ){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        //delete profile
        await User.findByIdAndDelete({_id:userDetails.additionalDetails});

        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Profile is Not Delete...!",
            error: error.message,
        })
    }
}




exports.getAllUserDetails = async(req, res) => {
    try{
        // get id 
        const id = req.user.id;

        //validation and get user details
        if(!id){
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            })
        }

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success: false,
            message: "User Data Fetched Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User details is Not Comming...!",
            error: error.message,
        })
    }
}