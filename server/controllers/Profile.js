const Profile = require("../modals/Profile");
const User = require("../modals/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.updateProfile = async(req, res) => {
    try{
        // get data
        const {
            dateOfBirth="", 
            about="", 
            contactNumber, 
        } = req.body;

        // get User Id
        const id = req.user.id;

 		// Find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

       // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;

        // Save the updated profile
        await profile.save();

        // return responce
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profile,
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
        const id = req.user;
        const user = await User.findById({ _id: id });

        if(!user ){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({_id: user.userDetails});

        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id: id});

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
        console.log(userDetails);
        //return response
        return res.status(200).json({
            success: false,
            message: "User Data fetched successfully",
            data: userDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User details is Not Comming...!",
        })
    }
}

exports.updateDisplayPicture = async(req, res) => {
    try{
       const displayPicture = req.files.displayPicture;
       const userId = req.user.id;
       const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000, 
            1000
       )
       console.log(image);
       const updatedProfile = await User.findByIdAndUpdate(
         {_id: userId},
         {image: image.secure_url},
         {new: true}
       )
       res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
       })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.getEnrolledCourses = async(req, res) => {
    try{

        const userId = req.user.id
        const userDetails = await User.findOne({
          _id: userId,
        })
          .populate("courses")
          .exec()
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })

    }
}