import express from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js";
import { getAllUsers, getUserStats, updateUserProfile, deleteUser } from "../controllers/usersControllers.js";

const router = express.Router()

router.put('/profile', protectRoute, updateUserProfile)

// admins only routes
router.get('/', protectRoute, checkUserRole, getAllUsers)
router.get('/stats', protectRoute, checkUserRole, getUserStats)
router.delete('/:id', protectRoute, checkUserRole, deleteUser)

export default router