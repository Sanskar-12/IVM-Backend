import mongoose from "mongoose";

const inventorySchema=new mongoose.Schema({
    type:String,
})

export const Inventory=mongoose.model("Inventory",inventorySchema)