const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

const postModel = new mongoose.model("post", postSchema)

module.exports = postModel