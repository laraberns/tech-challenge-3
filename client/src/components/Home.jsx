import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Movies from "./Movies/Movies"

function Home() {
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:1999/auth/verify').then(res => {
      if (!res.data.status) {
        navigate('/login')
      }
    })
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:1999/auth/logout').then(res => {
      if (res.data.status) {
        alert('Logout realizado');
        navigate('/login')
      }
    })
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Movies />
       <button onClick={handleLogout} className="btn btn-danger ml-auto">Sair</button>
    </div>
  )
}

export default Home
