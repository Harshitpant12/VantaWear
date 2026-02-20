import express from "express";
import { createOrder } from "../controllers/orderControllers";

const router = express.Router()

router.post("/", createOrder)
// router.get('/myorders', getMyOrders)
// router.get('/:id', getOrderById)

export default router