import { ApplicationSubmitted } from "../mails/ApplicationSubmitted.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();



export const sendApplicationMail = (userMail,userName,userRegisterNumber) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.MAIL_PASSWORD
        }
    });
    
    var mailOptions = {
        from: process.env.USER_MAIL,
        to: userMail,
        subject: 'Application Submitted',
        html: ApplicationSubmitted(userName,userRegisterNumber,"https://google.com")
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return error
        } else {
          return info.response
        }
    })
   
}