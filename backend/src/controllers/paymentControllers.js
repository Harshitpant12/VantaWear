import { stripe } from "../lib/stripe.js"
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createPaymentIntent = async (req, res) => {
    const { cartItems, shippingAddress } = req.body;
    const userId = req.user._id;

    try {
        if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: "Cart is empty!" });
        if (!shippingAddress) return res.status(400).json({ message: "Please provide the shipping address" });
        
        let total = 0;
        const validCartItems = [];

        for (const item of cartItems) {
            const product = await Product.findById(item.id);
            if (!product) return res.status(404).json({ message: `Product not found: ${item.name}` });

            total += product.price * item.quantity;

            validCartItems.push({
                product_id: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.images[0],
                size: item.size
            });
        }

        const shippingFee = total >= 10000 ? 0 : 500;
        total += shippingFee;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true
            }
        });

        // create order in database immediately as pending
        const newOrder = new Order({
            user_id: userId,
            order_items: validCartItems,
            shipping_address: shippingAddress,
            total_price: total,
            payment_status: "pending",
            order_status: "Processing",
            payment_intent_id: paymentIntent.id,
        });

        await newOrder.save();

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.log("Error in createPaymentIntent controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // update order status when payment succeeds
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        try {
            // find the pending order by intent id and update to successful
            const updatedOrder = await Order.findOneAndUpdate(
                { payment_intent_id: paymentIntent.id },
                { payment_status: "successful" },
                { new: true }
            );

            if (updatedOrder) {
                console.log(`Webhook: Order ${updatedOrder._id} marked as successful`);
            } else {
                console.log(`Webhook: Payment succeeded but no matching order found in database`);
            }

        } catch (error) {
            console.error("Error updating order from webhook:", error.message);
            // still return 200 so stripe doesn't keep retrying
            return res.status(200).send(); 
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
};