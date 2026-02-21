import express from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createPaymentIntent, verifyPayment } from "../controllers/paymentControllers";

const router = express.Router()

router.post('/process', protectRoute, createPaymentIntent)
// router.post('/verify', verifyPayment)

export default router