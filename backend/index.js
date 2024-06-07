import express, { json } from "express"
import cors from "cors"
import mongoose from "mongoose";
import { Student} from "./models/studentModel.js";
import { Status } from "./models/applicationStatusModel.js";
import { FacultyAdvisor } from "./models/FacultyAdvisorModel.js";
import { sendApplicationMail } from "./utilities/sendMail.js";
import dotenv from "dotenv"
dotenv.config();

app.use(express.static(path.join(__dirname, '../frontend/dist')));


const app = express();
app.use(cors({
    origin:"https://leaveease-1.onrender.com"
}));
app.use(express.json());



mongoose.connect(process.env.MONGO_URL);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });

app.post("/student/login",async (req, res) => {
    const { email, registerNumber } = req.body;

    const isStudent = await Student.findOne({ email, registerNumber });
    const checkStudent = await Status.findOne({ email, registerNumber });

    if (isStudent && checkStudent) {
        res.status(500).json({ message: "User already exists" });
    }
    else if (isStudent && !checkStudent) {
        await Student.deleteOne({ email, registerNumber });
        const newStudent = await Student.create({ email, registerNumber });

        if (newStudent) {

            res.status(200).json({ message:"Success" });

        } else {
            res.status(500).json({ message: "Some Error occured" })
        }
    
    }
    else {

        const newStudent = await Student.create({ email, registerNumber });

        if (newStudent) {
            res.status(200).json({ message:"Success" });
        } else {
            res.status(500).json({ message: "Some Error occured" })
        }
    }


})

app.post("/form", async (req,res) => {
    const {FormData} = req.body;

    const isStudent = await Student.findOne({email:FormData.email,registerNumber:FormData.registerNumber});

    if(isStudent) {
        const isSubmit = await FacultyAdvisor.create({studentId:isStudent._id,form:FormData});

        if(isSubmit) {
            await Status.create({email:isStudent.email,registerNumber:isStudent.registerNumber,status:1});
            const response = sendApplicationMail(isSubmit.form.email,isSubmit.form.firstName,isSubmit.form.registerNumber)
            res.status(200).json({message:"Success"});
        } 
        else {
            res.status(500).json({message:"Error occured"});
        } 

    } else {
        res.status(500).json({message:"Error Occurred"})
    }
})




app.listen(process.env.PORT || 3000, () => {
    console.log("server running")
})

