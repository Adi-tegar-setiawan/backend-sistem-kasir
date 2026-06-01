const { registerSchema, loginSchema } = require('../validations/auth.validation');
const { registerUser, loginUser } = require('../services/auth.service');
const { success } = require('zod');

const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const user = await registerUser(validatedData);

        res.status(201).json({
            success : true,
            message : "register user success",
            data : user
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const user = await loginUser(validatedData);
        return res.status(200).json({
            success : true,
            message : 'login berhasil',
            data : user
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const me = async (req, res) => {
    res.status(200).json({
        success: true,
        data : req.user
    })
}

module.exports = {
    register,
    login,
    me
}