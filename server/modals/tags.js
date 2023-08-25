const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    }
})

module.exports = mongoose.model("Tag", tagsSchema);