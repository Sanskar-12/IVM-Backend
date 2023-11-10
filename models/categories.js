import mongoose from "mongoose";

const categoriesScehma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

export const Categories = mongoose.model("Categories", categoriesScehma);
