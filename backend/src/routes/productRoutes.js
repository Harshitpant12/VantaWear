import express from "express";

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.get('/featured', getFeaturedProducts)
router.get('/categories', getAllCategories)

export default router