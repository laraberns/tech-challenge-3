import { useState } from "react"
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Sending a POST request to the server with user information
        Axios.post("http://localhost:1999/auth/resetPassword/" + token, {
            password
        })
            .then(response => {
                if (response.data.status) {
                    navigate('/login')
                }
                console.log(response.data)
            }).catch(error => console.log(error))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <br /> {/*remove before styling*/}

                <button type="submit">Resetar</button>

            </form>
        </div>
    )
}

export default ResetPassword
