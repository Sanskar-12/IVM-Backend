import mongoose from "mongoose";

const itemScehma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories', 
  },
});

export const Item = mongoose.model("Item", itemScehma);