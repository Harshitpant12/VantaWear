import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        stock_quantity: {
            type: Number,
            required: true,
            min: 0
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        images: {
            type: [String], // array of images url
            default: [],
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: String,
                createdAt: { type: Date, default: Date.now() } // if adding update comment option then also add the updatedAt
            }
        ],
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product