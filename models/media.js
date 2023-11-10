import mongoose from "mongoose";

const mediaScehma=new mongoose.Schema({
    file_url:{
        type:String,
        required:true,
    },
    file_name:{
        type:String,
        required:true,
    },

})

export const Media=mongoose.model("Media",mediaScehma)