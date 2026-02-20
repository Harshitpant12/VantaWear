import Order from "../models/orderModel";

export const createOrder = async (req, res) => {
    try {
        const event = req.body
        if (event.type === 'payment_intent.succeeded') {
            const paymentData = event.data.object;
            const existingOrder = await Order.findOne({ payment_intent_id: paymentData.id })
            if (existingOrder) return res.status(200).json({ message: "Order already exists!" })

            let orderItems;
            let shippingAddress;
            try {
                orderItems = JSON.parse(paymentData.metadata.order_items)
                shippingAddress = JSON.parse(paymentData.metadata.shipping_address)
            } catch {
                return res.status(400).json({ message: "Invalid order items or shipping address data" })
            }
            if(!orderItems.length) return res.status(400).json({message: "Order items cannot be empty"})
            if(!shippingAddress || Object.keys(shippingAddress).length === 0) return res.status(400).json({message: "Shipping address is required"})

            const totalPrice = Number(paymentData.metadata.total_price)
            if(isNaN(totalPrice) || totalPrice < 0) return res.status(400).json({message: "Invalid total price"})
            const order = await Order.create({
                user_id: paymentData.metadata.user_id,
                order_items: orderItems,
                payment_status: "successful",
                shipping_address: shippingAddress,
                order_status: "Processing",
                total_price: Number(paymentData.metadata.total_price)
            })
            return res.status(200).json({ message: "Order created successfully!", order})
        }
        res.status(400).json({ message: "Please make sure your payment is completed" })
    } catch (error) {
        console.log("Error in createOrder controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}