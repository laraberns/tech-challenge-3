import { useState } from "react"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { MdEmail, MdPassword } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Sending a POST request to the server with user information
        Axios.post("http://localhost:1999/auth/signup", {
            username,
            email,
            password
        })
            .then(response => {
                if (response.data.status) {
                    alert(response.data.message);
                    navigate('/login')
                } else {
                    alert(response.data.message);
                }
            }).catch(error => console.log(error))
    }

    return (
        <div className="grid">
            <form onSubmit={handleSubmit} className="form login">

                <div className="form__field">
                    <label htmlFor="username">
                        <FaRegUserCircle />
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="form__input"
                        onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form__field">
                    <label htmlFor="email">
                        <MdEmail />
                    </label>
                    <input
                        type="email"
                        autoComplete="off"
                        placeholder="E-mail"
                        className="form__input"
                        onChange={(e) => setEmail(e.target.value)} />

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
                    <input type="submit" value="Cadastre-se" />
                </div>

                <div>
                    <p className="text--center">
                        Já possui uma conta?
                        <Link to='/login'>
                            <span className="link-to space">Login </span>
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default Signup
