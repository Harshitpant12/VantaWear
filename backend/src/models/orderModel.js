import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String
    }
})

const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
})

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        order_items: {
            type: [orderItemSchema],
            required: true
        },
        shipping_address: {
            type: shippingAddressSchema,
            required: true
        },
        payment_status: {
            type: String,
            enum: ["pending", "cancelled", "successful"], // can add more later
            default: "pending",
            required: true,
        },
        order_status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered"],
            default: "Processing"
        },
        total_price: {
            type: Number,
            required: true,
            min: 0
        },
        payment_intent_id: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

orderSchema.index({ user_id: 1 }) // index to optimize queries when fetching user order history

const Order = mongoose.model("Order", orderSchema)

export default Order