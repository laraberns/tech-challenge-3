import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router()

// Route for user signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    const userEmail = await User.findOne({ email })
    if (userEmail) {
        return res.json({ message: 'Email já cadastrado' })
    }

    const userUsername = await User.findOne({ username })
    if (userUsername) {
        return res.json({ message: 'Usuário já cadastrado' })
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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: false, message: 'Usuário não cadastrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.json({ status: false, message: "Senha incorreta!" });
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 });

        // Inclua o ID do usuário no objeto de retorno
        return res.json({ status: true, message: "Login com sucesso", user_id: user._id });
    } catch (error) {
        // Lide com erros (por exemplo, erro no banco de dados)
        console.error(error);
        return res.status(500).json({ status: false, message: "Erro durante o login" });
    }
});


// Route for user Forgot Password
router.post("/forgotPassword", async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: 'Usuário não cadastrado' })
    }

    // Create a JWT token with the user's ID, which will be used for resetting the password
    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHAEMAIL1 + ' ' + process.env.SENHAEMAIL2 + ' ' + process.env.SENHAEMAIL3 + ' ' + process.env.SENHAEMAIL4
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Redefinir Senha',
        text: `http://localhost:5173/resetPassword/${token}`
    };

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            return res.json({ message: "Erro ao enviar email" })
        } else {
            return res.json({ status: true, message: "Email enviado" })
        }
    });

})

// Route for user Reset Password
router.post("/resetPassword/:token", async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    try {
        // Verify the token and extract the user ID from the decoded token
        const decoded = await jwt.verify(token, process.env.KEY)
        const id = decoded.id

        const hashpassword = await bcrypt.hash(password, 10)
        // Update the user's password in the database using the user ID
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
        return res.json({ status: true, message: 'Senha atualizada' })

    } catch (error) {
        res.json({ message: 'Token invalido' })
    }
})

const verifyUser = async (req, res, next) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.json({ status: false, message: "Sem token" })
        }
        next()
    } catch (error) {
        return res.json(error)
    }

}

// Protected routers
router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "Autorizado" })
})

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true })
})


export { router as UserRouter }