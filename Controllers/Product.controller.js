import productModel from "../Models/product.model.js";

export const addproduct = async(req,res)=>{
    try{
        const {name,price,category,image,id} = req.body;
        if(!name || !price || !category || !image)return res.status(401).json({success:false,message:"all data is mandotory.."})

        const product = new productModel({
            name,price,category,image,userId:id
        })
        await product.save()

        return res.status(201).json({success:true,message:"product added successfully..."})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const getAllProducts = async (req,res)=>{
    try{
        const products = await productModel.find({})
        if(products.length){
            return res.status(200).json({success:true,message:"product found",products:products})
        }
        return res.status(404).json({success:false,message:"product not found"})
    }catch(error){
        return res.status(500).json({ success: false, message: error })
    }
}

export const getSingleProducts = async(req,res)=>{
     try{
         const {id:productId} = req.query;
         if(!productId) return res.status(404).json({success:false,message:"id not found"})

         const product = await productModel.findById(productId)
         if(product){
            return res.status(200).json({success:true,message:"product found"})
         }
         return res.status(404).json({success:false,message:"product not found"})
     }catch(error){
        return res.status(500).json({success:false,message:error})
     }
}