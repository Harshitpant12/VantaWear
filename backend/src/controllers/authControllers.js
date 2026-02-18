import bcrypt from "bcrypt"

import User from "../models/userModel.js"
import { generateToken } from "../lib/utils.js"

export const signup = async (req, res) => {
    const { name, email, password, address } = req.body
    try {
        if (!name || !email || !password) return res.status(400).json({ message: "Please fill in all required fields" })
        if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" })

        const emailLower = email.toLowerCase().trim()
        const user = await User.findOne({ email: emailLower })
        if (user) return res.status(400).json({ message: "Email already exists" })


        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            name: name.trim(),
            email: emailLower,
            password: hashedPassword,
            role: "user",
            address,
        })
        generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        })
    } catch (error) {
        console.log("Error in signup controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).json({ message: "All fields are required" })

        const emailLower = email.toLowerCase().trim()
        const user = await User.findOne({ email: emailLower })
        if (!user) return res.status(401).json({ message: "Invalid credentials" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" })

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        console.log("Error in login controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = (_, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: "/"
        })
        res.status(200).json({ message: "Logged out successfully!" })
    } catch (error) {
        console.log("Error in logout controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const me = async (req, res) => {
    if (req.user) {
        res.status(200).json(req.user)
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}