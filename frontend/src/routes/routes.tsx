import React from "react"
import HomePage from "../pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Auth/LoginPage"


const RoutesApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/register" element={<RegisterPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp