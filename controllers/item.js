
import {Item} from "../models/item.js";


export const createItem = async (req, res, next)=>{


    try {
        const item = await Item.create(req.body);
        
        res.status(201).json({
            success: true,
            item
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}

//get all caregories
export const getItem = async (req, res, next)=>{
    try {
        const { selectedCategories } = req.body;
        console.log(selectedCategories)
        if (!selectedCategories || selectedCategories.length === 0) {
          const items = await Item.find({});
          return res.status(200).json({
            success:true,
            items
          });
        } else {
          
          const items = await Item.find({ categorie: { $in: selectedCategories } });
          return res.status(200).json({
            success:true,
            items
          });
        }
      } catch (error) {
        console.log(error);
        next(error);
    
    }
}





// export const getItemByID = async (req, res, next)=>{
//   try {
//       const { selectedCategories } = req.body;
//       console.log(selectedCategories)
//       if (!selectedCategories || selectedCategories.length === 0) {
//         const items = await Item.find({});
//         return res.status(200).json({
//           success:true,
//           items
//         });
//       } else {
        
//         const items = await Item.find({ categorie: { $in: selectedCategories } });
//         return res.status(200).json({
//           success:true,
//           items
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       next(error);
  
//   }
// }

