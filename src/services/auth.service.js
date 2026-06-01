const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt')

const registerUser = async (data) => {
        const { username, email, password } = data;
        
        const existingUser = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if (existingUser){
            throw new Error('email sudah digunakan')
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                username,
                email,
                password : hasedPassword,
                role : "KASIR"
            }
        })

        return {
            id: user.id,
            email: user.email,
            username : user.username
        }
}

const loginUser = async (data) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
        where : {
            email,
        }
    })

    if (!user) {
        throw new Error('email atau password salah')
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw new Error('email atau password salah')
    }

    const token = generateToken(user);
    return {
        user : {
            id: user.id,
            username : user.username,
            email : user.email,
            role: user.role
        },
        token
    }
}

module.exports = {
    registerUser,
    loginUser
}