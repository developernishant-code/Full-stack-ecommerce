const express = require("express")
const { createuser, verifyEmail, resetOtp, login } = require("../controllers/usercontroller")

const Userrouter = express.Router()
Userrouter.post("/create",createuser)
Userrouter.post("/verify-otp",verifyEmail)
Userrouter.post("/reset-otp",resetOtp)
Userrouter.post("/login",login)
module.exports = {Userrouter}