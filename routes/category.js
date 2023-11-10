import express from "express"
import { createCategory, getCategories, getCategoriesByID} from "../controllers/category.js";
const router = express.Router(); 



router.post('/category/create', createCategory );
router.get('/category/all', getCategories );
router.get('/category/getByID/:id', getCategoriesByID );//Done on 10/10/23


export default router;
