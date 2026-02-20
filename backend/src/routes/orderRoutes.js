import express from "express";

import { createOrder, getMyOrders, getOrderById } from "../controllers/orderControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js";

const router = express.Router()

router.post("/", createOrder) // no need for protect route as that will be triggered by stripe webhook
router.get('/myorders', protectRoute, getMyOrders)
router.get('/:id', protectRoute, getOrderById)

// admins only routes
router.get('/', protectRoute, checkUserRole, getAllOrders) // will be used for dashboard
router.patch('/:id/status', protectRoute, checkUserRole, updateOrderStatus) // using patch instead of put as we only have to update status not the whole model

export default router