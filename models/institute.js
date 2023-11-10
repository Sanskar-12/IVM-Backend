import mongoose from "mongoose";

const instituteSchema=new mongoose.Schema({
    header_img:{
        type:String,
        required:true,
    },
    institutename:{
        type:String,
        required:true,
    }
})

export const Institute=mongoose.model("Institute",instituteSchema)