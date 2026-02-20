import User from "../models/userModel.js"

export const updateUserProfile = async (req, res) => {
    const userId = req.user._id
    const { name, fullName, phone, street, city, state, postalCode, country } = req.body
    try {
        if (!name) return res.status(400).json({ message: "Please provide all required fields!" })

        const updateData = { name }
        const addressFields = { fullName, phone, street, city, state, postalCode, country }
        
        Object.entries(addressFields).forEach(([key, val]) => {
            if(val !== undefined && val !== ""){
                updateData[`address.${key}`] = val
            }
        })
        const user = await User.findByIdAndUpdate(userId, {$set: updateData}, { new: true })
        if (!user) return res.status(404).json({ message: "User not found!" })

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in updateUserProfile controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({createdAt : -1}) // shows latest users at first
        res.status(200).json(users) // later we might add pagination (no filters required)
    } catch (error) {
        console.log("Error in getAllUsers controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getUserGrowth = async (req, res) => {
    // will implement it soon... come check tommorow :)
}
