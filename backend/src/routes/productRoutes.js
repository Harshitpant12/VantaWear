import express from "express";

import { createProduct, deleteProduct, getAllCategories, getAllProducts, getFeaturedProducts, getProduct, updateProduct } from "../controllers/productControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js";

const router = express.Router()

router.get('/', getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/categories', getAllCategories)
router.get('/:id', getProduct) // this route should be at the end of all get routes because it can conflict with other get routes like /featured or /categories if placed before them as it will treat "featured" and "categories" as id and will try to find the product with those ids and will return 404 not found error for those routes which is not what we want. So always keep the dynamic routes at the end after all the specific routes to avoid such conflicts.

// admins only routes
router.post('/', protectRoute, checkUserRole, createProduct)
router.put('/:id', protectRoute, checkUserRole, updateProduct)
router.delete('/:id', protectRoute, checkUserRole, deleteProduct)

export default router