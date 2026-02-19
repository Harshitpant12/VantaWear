export const checkUserRole = (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next()
        } else {
            res.status(403).json({ message: "Access denied. Admins Only!" })
        }
    } catch (error) {
        console.log("Error in checkUserRole middleware : ", error.message)
        res.status(403).json({ message: "You are not allowed to access the link" })
    }
}