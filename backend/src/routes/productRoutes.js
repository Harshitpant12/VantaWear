import express from "express";

import { createProduct, getAllCategories, getAllProducts, getFeaturedProducts, getProduct, updateProduct } from "../controllers/productControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js";

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.get('/featured', getFeaturedProducts)
router.get('/categories', getAllCategories)

// admins only routes
router.post('/', protectRoute, checkUserRole, createProduct)
router.put('/:id', protectRoute, checkUserRole, updateProduct)
router.delete('/:id', protectRoute, checkUserRole, deleteProduct)

export default router