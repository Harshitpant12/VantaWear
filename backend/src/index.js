import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(cookieParser()) // to get the values from cookies specially in the middleware for checking the protected route

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
    connectDB()
})