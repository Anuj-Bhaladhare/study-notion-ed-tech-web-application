const express = require("express");
const app = express();

const CourseRouter = require("./routers/Course");
const PaymentRouter = require("./routers/Payment");
const ProfileRouter = require("./routers/Profile");
const UserRouter = require("./routers/User");

const database = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000

//database connect
database.connect();


// ********** middlewear ***************
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
		origin:"http://localhost:3000",
		credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();


// ********** routes ******************
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/course", CourseRouter);
app.use("/api/v1/payment", PaymentRouter);
// deff
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server up and running...."
    })
})


app.listen(PORT , (req, res) => {
    console.log(`Server started At port number ${PORT}`);
})