import { Categories } from "../models/categories.js";
import Department from "../models/department.js";
import { Products } from "../models/products.js";
import ApiFeature from "../utils/apiFeatures.js"

export const Product = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name,description, quantity, price,  status ,type,categorie,department} = req.body;
    // const categorie=await Categories.findById(req.params.category)
    // const department=await Department.findById(req.params.department)

    if (!name  || !description || !quantity || !price  || !status || !type) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    // if (req.user.user_level !== "Intiator") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User not Authorised",
    //   });
    // }

    //Image Uploading Cloudinary

    let product = await Products.create({
      name,
      description,
      quantity,
      price,
      categorie,
      department,
      status,
      type
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallProducts = async (req, res, next) => {
  try {

    const resultPerPage=5
    const productCount=await Products.countDocuments()


    //InBuilt Function
    const apifeature=new ApiFeature(Products,req.query).search().filter().pagination(resultPerPage)

   const products=await apifeature.query.populate("categorie department")
// const products =await Products.find({}).pagination(resultPerPage);
   res.status(200).json({
    success:true,
    products,
    productCount,
    resultPerPage
   })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const filterItems=async(req,res,next)=>{
  try {
    const { selectedCategories } = req.body;
    
    if (!selectedCategories || selectedCategories.length === 0) {
      const items = await Products.find({});
      return res.status(200).json({
        success:true,
        items
      });
    } else {
      
      const items = await Products.find({ categorie: { $in: selectedCategories } });
      return res.status(200).json({
        success:true,
        items
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });

}
}


export const getProduct=async(req,res,next)=>{
  try {
    const {productId}=req.params

    const product=await Products.findById(productId).populate("categorie department")

    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export const editProduct=async(req,res,next)=>{
  try {
    let product=await Products.findById(req.params.productId)
    if(!product)
    {
      return res.status(400).json({
        success:false,
        message:"Product Not Found"
      })
    }
    const {name,description, quantity, price,  status ,type}=req.body
    if(req.query.categoryId)
    {
      let category=await Categories.findById(req.query.categoryId)
      product.categorie=category._id
    }
    if(req.query.departmentId)
    {
      let department=await Department.findById(req.query.departmentId)
      product.department=department._id
    }


    if(name)
    {
      product.name=name
    }
    if(description)
    {
      product.description=description
    }
    if(quantity)
    {
      product.quantity=quantity
    }
    if(price)
    {
      product.price=price
    }
    if(status)
    {
      product.status=status
    }
    if(type)
    {
      product.type=type
    }

    await product.save()

    res.status(200).json({
      success:true,
      message:"Product Details Updated"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export const deleteProduct=async(req,res,next)=>{
  try {
    let product=await Products.findById(req.params.productId)

    if(!product)
    {
      return res.status(400).json({
        success:false,
        message:"Product Not Found"
      })
    }

    await product.deleteOne()

    res.status(200).json({
      success:true,
      message:"Product Deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}