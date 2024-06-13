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

});

export const Status = mongoose.model("Status",applicationStatus);