import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})