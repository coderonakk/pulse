const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token Not Found!!"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()


    } catch (err) {

        console.log(err);

        res.status(401).json({
            message: "InValid token"
        })
    }
}

module.exports = authUser