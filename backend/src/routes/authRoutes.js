import express from "express";

import { login, logout, me, signup } from "../controllers/authControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protectRoute, me) // Get current user data (to persist login state)

export default router