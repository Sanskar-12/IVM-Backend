import express from "express" 
import {getItem,createItem} from "../controllers/item.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router=express.Router()

router.post("/item/add-item",isAuthenticated,createItem)
router.get("/item/get-item",isAuthenticated,getItem)
// router.get("/item/get-itemById/:id",getItemByID)

export default router
