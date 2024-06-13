import mongoose, { Schema } from "mongoose";


const FacultyAdvisorSchema = new mongoose.Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:"Student"
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true,
    },
    form:{
        image:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        registerNumber:{
            type:String,
            required:true,
        },
        department:{
            type:String,
            required:true,
        },
        section:{
            type:String,
            required:true,
        },
        year:{
            type:String,
            required:true,
        },
        hostel:{
            type:String,
            required:true,
        },
        roomNumber:{
            type:String,
            required:true,
        },
        postalCode:{
            type:String,
            required:true,
        },
        dateOut:{
            type:String,
            required:true,
        },
        dateIn:{
            type:String,
            required:true,
        },
        reason:{
            type:String,
            required:true,
        },
        studentPhoneNumber:{
            type:String,
            required:true,
        },
        parentPhoneNumber:{
            type:String,
            required:true,
        }




    }
})

export const FacultyAdvisor = mongoose.model("FacultyAdvisor",FacultyAdvisorSchema);