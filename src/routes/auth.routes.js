const express = require('express')
const authUserController = require("../controllers/auth.controllers")
const authRoute = express.Router();
// route.use()
/**
 * @route POST /api/auth/register
 * @description Register user 
 * @access Public 
 */

authRoute.post("/register", authUserController);
module.exports = authRoute;