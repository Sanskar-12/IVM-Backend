import { Categories } from "../models/categories.js";
import Department from "../models/department.js";


export const createCategory = async (req, res, next)=>{


    try {
        const category = await Categories.create(req.body);
        res.status(201).json({
            success: true,
            category
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}

//get all caregories
export const getCategories = async (req, res, next)=>{

    try {
        const categories = await Categories.find();
        res.status(201).json({
            success: true,
            categories
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}
//Done on 10/10/23
export const getCategoriesByID = async (req, res, next)=>{

    try {
        const id=req.params.id;
        const categories = await Categories.findById(id);
        res.status(201).json({
            success: true,
            categories
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}