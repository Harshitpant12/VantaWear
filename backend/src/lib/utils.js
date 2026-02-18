import jwt from "jsonwebtoken"

export const generateToken = (userId, response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    response.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: "/"
    })

    return token;
}