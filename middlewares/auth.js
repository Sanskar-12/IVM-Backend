import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

export const isAuthenticated=async(req,res,next)=>{
    try {
        
        const {token}=req.cookies

        if(!token)
        {
            return res.status(200).json({
                success:false,
                message:"Not Logged In"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)


        req.user=await User.findById(decoded._id)


        
        next()


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
          });
    }
}