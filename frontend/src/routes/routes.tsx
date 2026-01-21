import React from "react"
import HomePage from "../pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Auth/LoginPage"
import RegisterPage from "../pages/Auth/RegisterPage"
import AdminDashboard from "../pages/Auth/AdminDashboard"
import AdminFlights from "../pages/Auth/AdminFlights"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const RoutesApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<PrivateRoute isAuthenticated={true} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/voos" element={<AdminFlights />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp
