import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, institution } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            message: "Password must be of 8 characters long"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        })
    }

    const existingUser = await User.findOne({ email })
    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const newUser = await User.create({
        name,
        email,
        password,
        role: role || "student",
        institution 
    })

    const userToReturn = newUser.toObject()
    delete userToReturn.password

    const token = jwt.sign({ userId: newUser._id } ,process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV == "production"
    })

    return res.status(201).json({
        message: "User created successfully",
        user: userToReturn,
        token
    })
  } catch (error) {
    console.error("Error in signup", error)
    return res.status(500).json({
        message: "Internal server error"
    })
  }
};

export const signin = async (req, res) => {};

export const signout = async (req, res) => {};

export const check = async (req, res) => {};
