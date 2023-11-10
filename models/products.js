import mongoose from "mongoose";

const productsScehma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
      },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    categorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', 
      },
    type:{
        type:String,
        enum:["Consumable","NonConsumable"],
        default:"Consumable",
        required:true,
    },
    status:{
        type:String,
        enum:["Published","Draft","LowStock","OutofStock"],
        default:"Draft",
        required:true,
    },
    media:{
        type:Object,
        default:{}
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Products=mongoose.model("Products",productsScehma)
//when product is choosen break in category and name