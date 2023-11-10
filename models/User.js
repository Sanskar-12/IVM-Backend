import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_level: {
    type: String,
    enum: [
      "Superuser",
      "Approval",
      "Verifier",
      "InstituteSuperuser",
      "Intiator",
    ],
    default: "Superuser",
  },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save",async function(next){
  if(this.isModified("password"))
  {
    this.password=await bcrypt.hash(this.password,10)
  }

  next()
})

userSchema.methods.generateToken=function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

userSchema.methods.MatchPassword=async function(password){
  return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User", userSchema);

