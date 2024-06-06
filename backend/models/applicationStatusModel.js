import mongoose from "mongoose";

const applicationStatus = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    registerNumber:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Number,
        required:true
    }
});

export const Status = mongoose.model("Status",applicationStatus);