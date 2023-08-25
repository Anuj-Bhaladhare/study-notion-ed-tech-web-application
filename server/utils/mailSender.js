const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({

            HOST: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                user: process.env.MAIL_USER,
            },
        })
        let info = await transporter.sendMail({
            from: `StudyNotion || Anuj's Team`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log("error catch in dending the Email", error.message);
    }
}

module.exports = mailSender;