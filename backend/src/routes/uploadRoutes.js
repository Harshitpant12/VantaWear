import express from "express"
import { protectRoute } from "../middlewares/authMiddleware.js"
import { checkUserRole } from "../middlewares/checkRoleMiddleware.js"
import { uploadImages } from "../controllers/uploadControllers.js"

const router = express.Router()

router.post('/', protectRoute, checkUserRole, uploadImages)

export default router;