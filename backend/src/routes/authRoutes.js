import express from "express";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', me) // Get current user data (to persist login state)

export default router