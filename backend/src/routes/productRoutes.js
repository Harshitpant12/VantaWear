import express from "express";

import { createProduct, getAllCategories, getAllProducts, getFeaturedProducts, getProduct } from "../controllers/productControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js";

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.get('/featured', getFeaturedProducts)
router.get('/categories', getAllCategories)

// admins only routes
router.post('/', protectRoute, checkUserRole, createProduct)

export default router