import { stripe } from "../lib/stripe.js"

export const createPaymentIntent = async (req, res) => {
    const { cartItems, shippingAddress} = req.body
    const userId = req.user._id
    try {
        if(!cartItems || cartItems.length === 0) return res.status(400).json({message: "Cart is empty!"})
        if(!shippingAddress) return res.status(400).json({message: "Please provide the shipping address"})
        const total = cartItems.reduce((acc, item) => { // later we can calculate using productId and its price from db
            return acc + item.price * item.quantity
        }, 0)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100, // paisa
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true
            },
            metadata:{
                user_id: userId.toString(),
                order_items: JSON.stringify(cartItems),
                shipping_address: JSON.stringify(shippingAddress),
                total_price: total.toString()
            }
        })
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        console.log("Error in createPaymentIntent controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// export const verifyPayment = async (req, res) => {

// }