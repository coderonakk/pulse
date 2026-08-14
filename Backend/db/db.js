const mongoose = require("mongoose")

async function connectDb() {

    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("DataBase connected");

    } catch (err) {
        console.log("DataBase error");

    }
}

module.exports = connectDb