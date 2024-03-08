import { useState } from "react"
import Axios from 'axios'
import { useNavigate } from "react-router-dom"
import { MdEmail } from "react-icons/md"

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
                alert(response.data.message)
            }).catch(error => console.log(error))
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
                        className="form__input"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form__field">
                    <input type="submit" value="Recuperar senha" />
                </div>

            </form>
        </div>
    )
}

export default ForgotPassword
