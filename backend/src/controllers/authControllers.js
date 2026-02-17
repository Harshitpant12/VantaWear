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