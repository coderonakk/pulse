const express = require("express")
const router = require("./routes/post.routes")
const authRouter = require("./routes/user.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')


const app = express()
app.use(cors({
    origin: "https://pulse-6x5mcrxbk-coderonakks-projects.vercel.app/",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
app.use("/api/auth", authRouter)

module.exports = app