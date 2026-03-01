import { stripe } from "../lib/stripe.js"
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createPaymentIntent = async (req, res) => {
    const { cartItems, shippingAddress } = req.body
    const userId = req.user._id
    try {
        if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: "Cart is empty!" })
        if (!shippingAddress) return res.status(400).json({ message: "Please provide the shipping address" })
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
                image: product.images[0]
            });
        }

        const shippingFee = total >= 10000 ? 0 : 500;
        total += shippingFee;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                user_id: userId.toString(),
                order_items: JSON.stringify(validCartItems),
                shipping_address: JSON.stringify(shippingAddress),
                total_price: total.toString()
            }
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.log("Error in createPaymentIntent controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyPayment = async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        // Fetch the actual PaymentIntent directly from Stripe's servers to verify is it real
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: "Payment was not successful" });
        }

        // Prevent duplicate orders (if the user refreshes the success page)
        const existingOrder = await Order.findOne({ payment_intent_id: paymentIntentId });
        if (existingOrder) {
            return res.status(200).json({ success: true, order: existingOrder });
        }

        const metadata = paymentIntent.metadata;
        const orderItems = JSON.parse(metadata.order_items);
        const shippingAddress = JSON.parse(metadata.shipping_address);
        const userId = metadata.user_id;
        const totalPrice = Number(metadata.total_price);

        const newOrder = new Order({
            user_id: userId,
            order_items: orderItems,
            shipping_address: shippingAddress,
            total_price: totalPrice,
            payment_status: "successful",
            order_status: "Processing",
            payment_intent_id: paymentIntentId
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            order: newOrder,
            message: "Payment verified and order created."
        });

    } catch (error) {
        console.log("Error in verifyPayment controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};