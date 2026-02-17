import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        default: "user"
    },
    address: {
        fullName: { type: String },
        phone: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    }
})

const User = mongoose.model("User", userSchema)

export default User;