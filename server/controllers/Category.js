const Category = require("../modals/Category");


//create Tag ka handler funciton
exports.createCategory = async (req, res) => {
  try {
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //create entry in DB
        const CategorysDetails = await Category.create({
             name: name,
             description: description,
        })
        console.log(CategorysDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Categorys Created Successfully",
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
exports.showAllCategories = async (req, res) => {
  try {
     const allCategorys = await Category.find(
                  {}, 
                  {name:true, description:true}
               );
     res.status(200).json({
        success: true,
        message: "All Catogary returned successfully",
        allCategorys,
     })
  } 
  catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
    })
  }
};

//categoryPageDetails 
const categoryPageDetails = async(req, res) => {
  try{
      //get categoryId
      const {categoryId} = req.body;

      //get courses for specified categoryId
      const selectedCatrgory = await Category.findById(categoryId).populate("courses").exes();

      //validation
      if(!selectedCatrgory){
        return res.status(404).json({
          success: false,
          message: "Data Not Found",
        })
      }

      //get coursesfor different categories
      const defferntCategorires = await Category.find({
                                     _id: {$ne: categoryId},
                                  })
                                  .populate("courses")
                                  .exec();

      //get top 10 selling courses
      //HW - write it on your own

      //return response
      return res.status(200).json({
        success: true,
        data: {
          selectedCatrgory,
          defferntCategorires,
        }
      });

  } catch(error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    });
  }
};