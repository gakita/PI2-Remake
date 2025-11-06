
import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../styles/AdminDashBoardIndex.css"
import UserCard from "./userCard"
import { imagePath } from "../hooks/imagePath"

interface SidebarProps {
    isOpen: boolean;
}

function Sidebar({isOpen}: SidebarProps){

    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [open,setOpen] = useState(isOpen)
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    return(
    <>
    
    <nav className={["sidebar", open ? "close" : "open"].join(" ")}>
        <div className="container-sidebar">
            {open? (
        <>
        <div className="sidebar-container">
            <div className="sm-nav-header">
            <i onClick={() => setOpen(!open)} className={open ? "bi bi-list" : ""}></i>
            </div>
            <div className="image-admin-nav-container img-overlay">
                <img className="image-admin-nav" src={imagePath(user?.avatarPath!)} alt="" />
            </div>
            <ul className="nav-list">
                <li>
                    <a href="#"> <i className="bi bi-airplane"></i></a>
                </li>
                <li>
                    <a href="#"><i className="bi bi-people"></i></a>
                </li>
                <li>
                <a href="#"><i className="bi bi-person"></i></a>
                </li>
                <li>
                    <a href="#"><i className="bi bi-calendar"></i></a>
                </li>
                <li><a onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></a></li>
            </ul>
        </div>
        </>
    ):(
        <>
        <div className="sidebar-container">
            <div className="nav-header">
                <h1>Cryas</h1>
                <i onClick={() => setOpen(!open)} className={["bi",open ? "" : "bi-x"].join(" ")}></i>
            </div>
            <div className="admin-container">
                <h2 className="navItem">ADMIN</h2>
            <div className="cardadm">
                <div className="img-overlay">
                    <UserCard homePage={false}/>
                </div>
            </div>
            <ul className="nav-list">
                <h2 className="navItem">MENU</h2>
                <li><a href="#">Voos</a></li>
                <li><a href="#">Usuarios</a></li>
                <li><a href="#">Clientes</a></li>
                <li><a href="#">Reservas</a></li>
                <li><a onClick={handleLogout}>Sair</a></li>
            </ul>
            </div>
        </div>
        </>
    )}
        </div>
    </nav>
    </>
    )
}

export default Sidebar