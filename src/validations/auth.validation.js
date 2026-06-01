const { z } = require('zod');

const registerSchema = z.object({
    username : z.string().min(3, "username minimal 3 karakter"),
    email : z.email(),
    password : z.string().min(8, "password minimal 8 karakter")
})

const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(8, "password minimal 8 karakter")
})

module.exports = {
    registerSchema,
    loginSchema
}