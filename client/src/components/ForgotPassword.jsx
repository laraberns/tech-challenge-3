import { useState } from "react"
import Axios from 'axios'
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Sending a POST request to the server with user information
        Axios.post("http://localhost:1999/auth/forgotPassword", {
            email
        })
            .then(response => {
                if (response.data.status) {
                    alert("Cheque seu e-mail para nova senha")
                    navigate('/login')
                }
                console.log(response.data)
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

                <button type="submit">Enviar</button>

            </form>
        </div> 
    )
}

export default ForgotPassword
