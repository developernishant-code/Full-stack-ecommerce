const Usermodel = require("../models/Usermodel")
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { sendOtpMail } = require("../utils/sendOtp")

const createuser = async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            })
        }
        const userexist = await Usermodel.findOne({ email })
        if (userexist) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            })
        }
        const encryptedString = cryptr.encrypt(password);
        const otp = Math.floor(100000 + Math.random() * 90000)
        const user = await Usermodel.create({
            name,
            email,
            password: encryptedString,
            otp: otp,
            otpexpire: Date.now() + 3 * 60 * 1000

        })
        const mailRes = await sendOtpMail(email, otp)
        console.log(mailRes)
        res.status(201).json({
            message: "User Created Successfully",
            success: true,
            id: user._id,
            name: user.name,
            email: user.email
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            });
        }

        const userexist = await Usermodel.findOne({ email });

        if (!userexist || userexist.isVerified === false) {
            return res.status(409).json({
                message: "User not found",
                success: false
            });
        }

        // 🔥 Correct logic
        const decryptedPass = cryptr.decrypt(userexist.password);

        if (decryptedPass !== password) {
            return res.status(401).json({
                message: "Wrong password",
                success: false
            });
        }

        return res.status(200).json({
            message: "User Login Successfully",
            success: true,
            id: userexist._id,
            name: userexist.name,
            email: userexist.email
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body
        // console.log(req.body)
        const userexist = await Usermodel.findOne({ email })
        if (!userexist) {
            return res.status(409).json({
                message: "User not found",
                success: false
            })
        }
        if (userexist.isVerified) {
            return res.status(401).json({
                message: "Email is already verified",
                success: false
            })
        }
        if (String(userexist.otp) !== String(otp)) {
            return res.status(409).json({
                message: "Invalid Otp",
                success: false
            })
        }
        if (userexist.otpexpire < Date.now()) {
            return res.status(402).json({
                message: "Otp has expired",
                success: false
            })
        }
        userexist.isVerified = true
        userexist.otp = undefined
        userexist.otpexpire = undefined
        await userexist.save()
        return res.status(201).json({
            message: "Email verified successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const resetOtp = async (req, res) => {
    try {
        const { email } = req.body
        const userexist = await Usermodel.findOne({ email })
        if (!userexist) {
            return res.status(409).json({
                message: "User not found",
                success: false
            })
        }
        const otp = Math.floor(100000 + Math.random() * 90000)
        user.otp = otp
        user.otpexpire = Date.now() + 3 * 60 * 1000
        await user.save()
        const mailResponse = await sendOtpMail(email, otp)
        console.log(mailResponse)
        return res.status(201).json({
            message: "Otp Reset Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = { createuser, verifyEmail, resetOtp, login }