import Jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js";
import bcrypt from 'bcrypt';

export const Register=async(req,res)=>{
    try{
        const {name,email,password} =req.body.userData;
        if(!name || !email || !password)return res.status(401).json({success:false,message:"all data is mandotory"})

        const hashedPass = await bcrypt.hash(password,10)
        const user = new userModel({
            name,email,password:hashedPass
        })
        await user.save();
        return res.status(200).json({success:true,message:"registration successfull"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const Login=async(req,res)=>{
    try{
        const {email,password} =req.body.userData;
        if(!email || !password)return res.status(401).json({success:false,message:"all data is mandotory..."})

        const user = await userModel.findOne({email:email})
        if(!user) return res.status(401).json({ success: false, message: "email is wrong" })

        const isPassCorrect = await bcrypt.compare(password,user.password)
        if(!isPassCorrect){
            return res.status(401).json({ success: false, message: "Password is wrong" })
        }

        const token = await Jwt.sign({id:user._id},process.env.JWT_SEC)
        
        return res.status(200).json({success:true,message:"Login successfull",user:{name:user.name,id:user._id},token})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const GetCurrentUser=async(req,res)=>{
    try{
        const {token} = req.body;
        if(!token) return res.status(401).json({success:false,message:"token not found"})

        const {id}= await Jwt.verify(token,process.env.JWT_SEC)

        const user = await userModel.findById(id)
        if(!user)return res.status(401).json({success:false,message:"user not found"})

        return res.status(200).json({success:true,user:{name:user.name,id:user._id}})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}