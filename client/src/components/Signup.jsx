import { useState } from "react"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

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
                    navigate('/login')
                }
            }).catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />

                <br /> {/*remove before styling*/}

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

                <button type="submit">Sign up</button>

                <p>Já possui uma conta?  <Link to='/login'>Login</Link></p>

            </form>
        </div>
    )
}

export default Signup
