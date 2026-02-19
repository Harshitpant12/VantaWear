import jwt from "jsonwebtoken"

export const generateToken = (userId, role, response) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { // we can also add the role in the token payload to check the authorization for the protected routes however for /me route we are not checking the role as it is just to persist the login state and get the user data in the frontend so it wont cause any problem there
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