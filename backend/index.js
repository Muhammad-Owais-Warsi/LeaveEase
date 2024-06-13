import express, { json } from "express"
import cors from "cors"
import mongoose from "mongoose";
import { Student } from "./models/studentModel.js";
import { Status } from "./models/applicationStatusModel.js";
import { FacultyAdvisor } from "./models/FacultyAdvisorModel.js";
import { sendApplicationMail } from "./utilities/sendMail.js";
import { applicationWithdrawnMail } from "./utilities/sendMail.js";
import multer from "multer";
import dotenv from "dotenv"
dotenv.config();



const app = express();
const storage = multer.memoryStorage();
const upload = multer({storage:storage})


app.use(cors({
    origin:"https://leaveease-1.onrender.com"
}));


// app.use(cors());
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true }));



// mongoose.connect(process.env.MONGO_URL);
mongoose.connect("mongodb://127.0.0.1:27017/development")


app.post("/student/login", async (req, res) => {
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

            res.status(200).json({ message: "Success" });

        } else {
            res.status(500).json({ message: "Some Error occured" })
        }

    }
    else {

        const newStudent = await Student.create({ email, registerNumber });

        if (newStudent) {
            res.status(200).json({ message: "Success" });
        } else {
            res.status(500).json({ message: "Some Error occured" })
        }
    }


})

app.post("/form",upload.single('image') ,async (req, res) => {
    const { FormData } = req.body;

    // const imageUrl = FormData.image;
    // // const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    // const imageBuffer = Buffer.from(imageUrl, "base64");
    // FormData.image = imageBuffer;

    const isStudent = await Student.findOne({ email: FormData.email, registerNumber: FormData.registerNumber });

    if (isStudent) {
        const isSubmit = await FacultyAdvisor.create({ studentId: isStudent._id, department: FormData.department, section: FormData.section, form: FormData });

        if (isSubmit) {
            await Status.create({ email: isStudent.email, registerNumber: isStudent.registerNumber, status: 1, form: FormData });
            const response = sendApplicationMail(isSubmit.form.email, isSubmit.form.firstName, isSubmit.form.registerNumber)

            res.status(200).json({ message: "Success" });
        }
        else {
            res.status(500).json({ message: "Error occured" });
        }

    } else {
        res.status(500).json({ message: "Error Occurred" })
    }
})

app.post("/applicationStatus/login", async (req, res) => {
    try {
        const { email, registerNumber } = req.body;

        const isUser = await Status.findOne({ email, registerNumber });
        if (isUser) {
            res.status(200).json({ email: isUser.email, registerNumber: isUser.registerNumber });
        }
        else {
            res.status(404).json({ message: "Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
})

app.post("/application/status", async (req, res) => {

    try {

        const { email, registerNumber } = req.body;
        const isUser = await Status.findOne({ email, registerNumber });

        if(isUser) {
        
            // const imageBuffer = isUser.form.image;
            // const base64Image = imageBuffer.toString('base64');
            // isUser.form.image = base64Image;
          
            res.status(200).json({isUser});
        } 
        else {
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        res.status(500).json({message:"Error"});
    }


});


app.post("/application/withdraw", async (req, res) => {
    try {
        const { email, registerNumber } = req.body;

        const isUser = await Student.findOne({ email, registerNumber });
        const userStatus = await Status.findOne({ email, registerNumber });

        if (isUser) {
            if (userStatus && userStatus.status === 1) {
                const checkUser = await FacultyAdvisor.findOne({ studentId: isUser._id });
                if (checkUser) {
                    await FacultyAdvisor.deleteOne({studentId:isUser._id})
                    await Status.deleteOne({ email, registerNumber });
                    await Student.deleteOne({ email, registerNumber });
                    applicationWithdrawnMail(email,registerNumber);
                    console.log("Records deleted successfully");
                }
                res.status(200).json({ message: "Success" });
            } else {
                // If status is not 1 or userStatus doesn't exist
                console.log("User's status is not approved or user not found");
                res.status(404).json({ message: "User's status is not approved or user not found" });
            }
        } else {
            // If user not found
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});




app.listen(process.env.PORT || 3000, () => {
    console.log("server running")
})

