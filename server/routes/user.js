import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Route for user signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: 'Usuário já existe' })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        email,
        password: hashpassword,
        username
    })

    // Save the new user to the database
    await newUser.save()

    return res.json({ message: "Usuário registrado", status: true })
})


// Route for user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: 'Usuário não cadastrado' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.json({ message: "Senha incorreta!" })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, {httpOnly: true, maxAge: 360000 })

    return res.json({ status: true, message: "Login com sucesso" })
})

export { router as UserRouter }