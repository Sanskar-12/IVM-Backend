import express from "express"
import { AddaUser, GetAllUser, GetUserById, GetUserDetail, Login, SignUp, logout } from "../controllers/User.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router=express.Router()

router.post("/signup",SignUp)
router.post("/login",Login)
router.get("/getallUser",isAuthenticated,GetAllUser)
router.get("/me",isAuthenticated,GetUserDetail)
router.post("/addaUser",isAuthenticated,AddaUser)
router.get("/user/getByID/:id",isAuthenticated,GetUserById)
router.get("/logout",logout)


export default router