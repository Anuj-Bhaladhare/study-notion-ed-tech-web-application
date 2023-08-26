const Tag = require("../modals/tags");


//create Tag ka handler funciton
exports.createTag = async (req, res) => {
  try {
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        //create entry in DB
        const tagDetails = await Tag.create({
             name: name,
             description: description,
        })
        //return response
        res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })
    } 
  catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
    })
   }
};

//getAlltags handler function
exports.showAlltags = async () => {
  try {
  } catch (error) {}
};
