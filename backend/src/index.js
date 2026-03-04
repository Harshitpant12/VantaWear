import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import usersRoutes from "./routes/usersRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { stripeWebhook } from "./controllers/paymentControllers.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser()) // to get the values from cookies specially in the middleware for checking the protected route

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/upload', uploadRoutes)
// app.use('api/settings', idontknowcurrently) // will create it later!

connectDB();

// Only listen locally. Vercel handles the routing in production.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
}

// Export the app for Vercel Serverless Functions
export default app;