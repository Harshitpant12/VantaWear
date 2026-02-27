import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { createPaymentIntent, verifyPayment } from "../controllers/paymentControllers.js";

const router = express.Router()

router.post('/process', protectRoute, createPaymentIntent)
router.post('/verify', protectRoute, verifyPayment)

export default router