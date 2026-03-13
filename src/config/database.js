const mongoose = require("mongoose");

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongooes connected successfuly");
    } catch (err) {
        console.log("error to connect to mongooes");
    }
}

module.exports = connectDb;