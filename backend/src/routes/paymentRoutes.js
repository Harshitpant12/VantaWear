import express from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createPaymentIntent } from "../controllers/paymentControllers";

const router = express.Router()

router.post('/process', protectRoute, createPaymentIntent)
// router.post('/verify', verifyPayment) // will implement it after frontend

export default router