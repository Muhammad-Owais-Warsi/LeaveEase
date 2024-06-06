import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    registerNumber:{
        type:String,
        required:true,
        unique:true
    }
});

export const Student = mongoose.model("Student",studentSchema);

