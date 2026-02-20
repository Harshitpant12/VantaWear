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
            if (!orderItems.length) return res.status(400).json({ message: "Order items cannot be empty" })
            if (!shippingAddress || Object.keys(shippingAddress).length === 0) return res.status(400).json({ message: "Shipping address is required" })

            const totalPrice = Number(paymentData.metadata.total_price)
            if (isNaN(totalPrice) || totalPrice < 0) return res.status(400).json({ message: "Invalid total price" })
            const order = await Order.create({
                user_id: paymentData.metadata.user_id,
                order_items: orderItems,
                payment_status: "successful",
                shipping_address: shippingAddress,
                order_status: "Processing",
                total_price: Number(paymentData.metadata.total_price)
            })
            return res.status(200).json({ message: "Order created successfully!", order })
        }
        res.status(400).json({ message: "Please make sure your payment is completed" })
    } catch (error) {
        console.log("Error in createOrder controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMyOrders = async (req, res) => {
    const userId = req.user._id
    try {
        const myOrders = await Order.find({ user_id: userId }).sort({ createdAt: -1 }) // present to past (current on top, first one on bottom)

        res.status(200).json({
            success: true,
            count: myOrders.length,
            orders: myOrders
        })
    } catch (error) {
        console.log("Error in getMyOrders controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getOrderById = async (req, res) => {
    const userId = req.user._id
    const orderId = req.params.id
    try {
        const order = await Order.findOne({ user_id: userId, _id: orderId })
        if (!order) return res.status(404).json({ message: "No order found!" })

        res.status(200).json({ // trying to keep everything consistent :)
            success: true,
            order
        })
    } catch (error) {
        console.log("Error in getOrderById controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }) // later we can have pagination (for large amount of orders) here as well but not for now
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })
    } catch (error) {
        console.log("Error in getAllOrders controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id
    const { order_status } = req.body
    try {
        const order = await Order.findOne({ _id: orderId }) // we can use findById also, its about choice :)
        if (!order) return res.status(404).json({ message: "No order found!" })
        if(order.order_status === order_status) return res.status(400).json({message: "Order already has this status"})

        const statusOptions = Order.schema.path('order_status').enumValues
        if (!statusOptions.includes(order_status)) return res.status(400).json({ message: "Please choose a valid option!" })

        order.order_status = order_status
        await order.save()

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log("Error in updateOrderStatus controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}