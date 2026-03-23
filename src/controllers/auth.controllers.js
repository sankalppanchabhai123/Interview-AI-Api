const { jwt } = require("jsonwebtoken");
const userModel = require("../modules/schema");
const cookieParser = require("cookie-parser");

/**
 * @route POST /api/auth/register
 * @description Register user 
 * @access Public 
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            "massage": "please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.find({
        $or: ("username", "email")
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({ "massage": "username/email already taken" })
    }

    const hashedPassword = await bcrypt.hash("password", password);

    const User = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = await jwt.sign({
        id: User._id,
        username: User.username,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: User._id,
            username: User.username,
            email: User.email,
        }
    })
}

module.exports = {
    registerUserController
}