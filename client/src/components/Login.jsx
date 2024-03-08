import Axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
                    navigate('/')
                }
            }).catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />

                <br /> {/*remove before styling*/}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <br /> {/*remove before styling*/}

                <button type="submit">Login</button>

                <p>Não possui uma conta?  <Link to='/signup'>Registre-se</Link></p>

                <Link to='/forgotPassword'>Esqueceu a senha?</Link>

            </form>
        </div>
    )
}

export default Login
