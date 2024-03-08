import Axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './authStyles.css'
import { MdEmail, MdPassword } from "react-icons/md";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        // Sending a POST request to the server with user information
        Axios.post("http://localhost:1999/auth/login", {
            email,
            password
        })
            .then(response => {
                if (response.data.status) {
                    alert(response.data.message);
                    navigate('/')
                } else {
                    alert(response.data.message);
                }
            }).catch(error => alert(error))
    }

    return (
        <div className="grid">
            <form onSubmit={handleSubmit} className="form login">

                <div className="form__field">
                    <label htmlFor="email">
                        <MdEmail />
                    </label>
                    <input
                        type="email"
                        autoComplete="off"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form__input" />
                </div>

                <div className="form__field">
                    <label htmlFor="password">
                        <MdPassword />
                    </label>
                    <input
                        type="password"
                        placeholder="Senha"
                        className="form__input"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form__field">
                    <input type="submit" value="Login" />
                </div>

                <div>
                    <p className="text--center">Não possui uma conta?
                        <Link to='/signup'>
                            <span className="link-to space">Registre-se</span>
                        </Link>
                    </p>

                    <p className="text--center">
                        <Link to='/forgotPassword'>
                            <span className="link-to">Esqueceu a senha?</span>
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default Login
