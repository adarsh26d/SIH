import express from "express"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to homepage")
})

app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT ${PORT}`)
})