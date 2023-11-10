import express from "express" 
import { Product, deleteProduct, editProduct, filterItems, getProduct, getallProducts } from "../controllers/Product.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router=express.Router()

router.post("/create/product",isAuthenticated,Product)
router.get("/get/all/product",getallProducts)
router.get("/filter/products",isAuthenticated,filterItems)
router.get("/get/product/:productId",isAuthenticated,getProduct)
router.put("/update/product/:productId",isAuthenticated,editProduct)
router.delete("/delete/product/:productId",isAuthenticated,deleteProduct)


export default router

