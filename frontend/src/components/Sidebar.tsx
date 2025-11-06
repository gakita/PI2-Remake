
import { useAuth } from "../services/authContext"
import { data, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import api from "../Server"
import "../styles/sidebar.css"
import UserCard from "./userCard"

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
}

function Sidebar({isOpen, toggle}: SidebarProps){

    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [open,setOpen] = useState(isOpen)
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    return(
    <>
    
    <nav className={["sidebar", open ? "active" : ""].join(" ")}>

    {open? (
        <>
        <div className="nav-header">
            <h1>Cryas Airways</h1>
            <button onClick={() => setOpen(!open)}>
                <i className={open ? "bi bi-x" : "bi bi-list"}></i>
            </button>
        </div>
        <ul className="nav-list">
            <li><a href="/getFlights">Voos</a></li>
            <li><a href="/getUsers">Usuarios</a></li>
            <li><a href="/getClients">Clientes</a></li>
            <li><a href="/getReservations">Reservas</a></li>
            <li><a onClick={handleLogout}>Sair</a></li>
        </ul>
        </>
    ):(
        <>
        <div className="nav-header">
            <h1>Cryas</h1>
            <button onClick={() => setOpen(!open)}>
                <i className={open ? "bi bi-x" : "bi bi-list"}></i>
            </button>
        </div>
        <div>
            <UserCard homePage={false}/>
        </div>
        <ul className="nav-list">
            <p>MENU</p>
            <li>
                <a href="/getFlights"> <i className="bi bi-airplane"></i></a>
            </li>
            <li>
                <a href="/getUsers"><i className="bi bi-people"></i></a>
            </li>
            <li>
            <a href="/getClients"><i className="bi bi-person"></i></a>
            </li>
            <li>
                <a href="/getReservations"><i className="bi bi-calendar"></i></a>
            </li>
            <li><a onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></a></li>
        </ul>
        </>
    )}
    </nav>
    </>
    )
}

export default Sidebar