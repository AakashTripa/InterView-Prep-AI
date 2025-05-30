import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id:userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//@desc Register new user
//@route POST /api/aut/register
//@access Public
export const registerUser = async (req, res) => {
    try{
        const {name,email,password,profileImageUrl}=req.body;

        //check if user exists
        const userExists=await User.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error("User already exists");
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            profileImageUrl,
        });

        //Return user with jwt
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email,password}=req.body;

        //check if user exists
        const user=await User.findOne({email});
        if(!user){
            res.status(500).json({message:"Invalid email or password"});
        }

        //check if password is correct
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).json({message:"Invalid email or password"});
        }
            //return user data with jwt
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                profileImageUrl:user.profileImageUrl,
                token:generateToken(user._id),
            });

        }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const getUserProfile = async (req, res) => {
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            res.status(404).json("User not found");
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}