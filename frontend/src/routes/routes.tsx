import React from "react"
import HomePage from "../pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"


const RoutesApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/login" element={<LoginPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp