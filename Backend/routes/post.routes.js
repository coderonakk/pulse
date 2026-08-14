const express = require('express')
const postModel = require("../models/post.model")
const uploadFile = require("../services/imagekit")
const authUser = require("../middleware/auth.middleware")
const multer = require("multer")

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post("/create", authUser, upload.single('file'), async (req, res) => {

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption,
        author: req.user.id
    })

    return res.status(201).json({
        message: "Post Created SuccessFully",
        post: {
            image: post.image,
            caption: post.caption,
            author: post.author
        }

    })
})

router.get("/get", async (req, res) => {

    const result = await postModel.find()
        .sort({ createdAt: -1 })
        .populate('author', "username")

    return res.status(200).json({
        result,
    })
})

router.delete("/delete/:id", authUser, async (req, res) => {

    const post = await postModel.findById(req.params.id)

    if (!post) {
        return res.status(403).json({
            message: "Post not found"
        })
    }

    if (post.author.toString() !== req.user.id) {
        return res.status(403).json({
            message: "You are not allowed to delete this post"
        })
    }

    await postModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        message: "Post deleted Successfully"
    })

})






module.exports = router