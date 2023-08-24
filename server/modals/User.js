const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    accountType:{
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        required: true,
    },
    furtherDe
})

module.exports = mongoose.model("User", userSchema);