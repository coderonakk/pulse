const express = require("express")
const router = require("./routes/post.routes")
const authRouter = require("./routes/user.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
app.use("/api/auth", authRouter)

module.exports = app