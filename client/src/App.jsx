import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Auth/Signup"
import Login from "./components/Auth/Login"
import Home from "./components/Home"
import ResetPassword from "./components/Auth/ResetPassword"
import ForgotPassword from "./components/Auth/ForgotPassword"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
