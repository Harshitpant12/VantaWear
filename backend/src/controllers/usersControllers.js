import bcrypt from "bcrypt"

import User from "../models/userModel.js"

export const updateUserProfile = async (req, res) => {
    const userId = req.user._id
    const { name, fullName, phone, street, city, state, postalCode, country } = req.body
    try {
        if (!name) return res.status(400).json({ message: "Please provide required fields!" })

        const updateData = { name }
        const addressFields = { fullName, phone, street, city, state, postalCode, country }

        Object.entries(addressFields).forEach(([key, val]) => {
            if (val !== undefined && val !== "") {
                updateData[`address.${key}`] = val
            }
        })
        const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select("-password")
        if (!user) return res.status(404).json({ message: "User not found!" })

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in updateUserProfile controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updatePassword = async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    try {
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide both current and new passwords!" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "New password must be at least 8 characters long!" });
        }

        const user = await User.findById(userId).select('+password');
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid current password!" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        console.log("Error in updatePassword controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 }) // shows latest users at first
        res.status(200).json(users) // later we might add pagination (no filters required)
    } catch (error) {
        console.log("Error in getAllUsers controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getUserStats = async (req, res) => {
    try {
        // first we will have to create a date for today
        const startOfToday = new Date() // later properly check according to different time zone
        startOfToday.setHours(0, 0, 0, 0)

        const [totalUsers, newUsersToday] = await Promise.all([
            User.estimatedDocumentCount(), // total count -> will be assigned to totalUsers
            User.countDocuments({ createdAt: { $gte: startOfToday } }) // today's users count -> will be assigned to newUsersToday
        ])

        res.status(200).json({
            totalUsers,
            newUsersToday
        })
    } catch (error) {
        console.log("Error in getUserStats controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(404).json({ message: "User Not Found!" })

        res.status(200).json({ message: "User deleted successfully!" })
    } catch (error) {
        console.log("Error in deleteUser controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}