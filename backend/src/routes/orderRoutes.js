import express from "express";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/", createOrder) // no need for protect route as that will be triggered by stripe webhook
router.get('/myorders', protectRoute, getMyOrders)
router.get('/:id', protectRoute, getOrderById)

export default router