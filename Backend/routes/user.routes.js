const express = require('express')
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const authUser = require('../middleware/auth.middleware')

const router = express.Router()

router.post("/register", async (req, res) => {

    const { username, email, password } = req.body

    const userexists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (userexists) {
        return res.status(401).json({
            message: "User already exists"
        })
    }

    console.log(password);


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "New User Created",
        user
    })
})

router.post("/login", async (req, res) => {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })


    if (!user) {
        return res.status(401).json({
            message: "User dont exist"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in Successfully"
    })
})

router.get('/me', authUser, async (req, res) => {

    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email
    })
})

router.post("/logout", authUser, async (req, res) => {

    res.clearCookie("token")

    return res.status(200).json({
        message: "Logged out successfully"
    })

})
module.exports = router