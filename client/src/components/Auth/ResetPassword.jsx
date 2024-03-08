import { useState } from "react"
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

import { MdPassword } from "react-icons/md";

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Sending a POST request to the server with user information
        Axios.post("http://localhost:1999/auth/resetPassword/" + token, {
            password
        })
            .then(response => {
                if (response.data.status) {
                    alert(response.data.message);
                    navigate('/login')
                }
                alert(response.data.message)
            }).catch(error => console.log(error))
    }
    return (
        <div className="grid">
            <form onSubmit={handleSubmit} className="form login">

                <div className="form__field">
                    <label htmlFor="password">
                        <MdPassword />
                    </label>
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form__field">
                    <input type="submit" value="Mudar senha" />
                </div>

            </form>
        </div>
    )
}

export default ResetPassword
