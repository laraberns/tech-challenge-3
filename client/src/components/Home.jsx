import { useEffect } from "react"
import {useNavigate } from "react-router-dom"
import axios from 'axios'

function Home() {
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:1999/auth/verify').then(res => {
      if (res.data.status) {
        console.log('Acesso liberado');
      } else {
        navigate('/login')
      }
    })
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:1999/auth/logout').then(res => {
      if (res.data.status) {
        navigate('/login')
      }
    })
  }

  return (
    <div>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Home
