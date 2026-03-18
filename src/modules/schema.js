const mongoose = require("mongoose");


const userProfile = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, "email already exist in our record"],
        required: [true, "email is needed"],
    },
    password: {
        type: String,
        required: true,

    },
    profile_pic: {
        type: image,
    }
})