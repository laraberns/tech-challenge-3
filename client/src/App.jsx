import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import ForgotPassword from "./components/ForgotPassword"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
