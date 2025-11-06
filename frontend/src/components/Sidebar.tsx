
import { useAuth } from "../services/authContext"
import { data, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import UserCard from "../components/userCard"
import api from "../Server"
import "../styles/sidebar.css"

function Sidebar(){

    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [open,setOpen] = useState(true)
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    return(
    <>
    
    <nav className={["sidebar", open ? "active" : ""].join(" ")}>
        <h1>Cryas Airways</h1>
    {open? (
        <>
        <ul>
            <li><a href="/getFlights">Voos</a></li>
            <li><a href="/getUsers">Usuarios</a></li>
            <li><a href="/getClients">Clientes</a></li>
            <li><a href="/getReservations">Reservas</a></li>
            <li><a onClick={handleLogout}>Sair</a></li>
        </ul>
        <button onClick={() => setOpen(!open)}>
            <i className={open ? "bi bi-x" : "bi bi-list"}></i>
        </button>
        </>
    ):(
        <>
        <div>
            
        </div>
        <ul>
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