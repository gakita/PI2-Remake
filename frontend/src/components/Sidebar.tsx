
import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../styles/AdminDashBoardIndex.css"
import UserCard from "./userCard"
import { imagePath } from "../hooks/imagePath"
import * as Icons from '@mui/icons-material';


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
        <aside>
            <nav className={["sidebar", (open ? "open" : "close")].join(" ")}>
                {
                    open ? (
                        //OPEN
                        <>
                        <div className="sidebar-header">
                            <h2><span className="blue">Cr</span>y<span className="red">as</span></h2>
                            <Icons.Close onClick={() => setOpen(false)} htmlColor="#fff" style={{cursor:"pointer"}}/>
                        </div>
                        <div className="sidebar-menu">
                            <div className="active-user">
                                <p>ADMIN</p>
                                <UserCard homePage={false}/>
                            </div>
                            <div className="sidebar-menu-items">
                                <p>MENU</p>
                                <a href="#"><Icons.DashboardOutlined/>Dashboard</a>
                                <a href="#"><Icons.ConnectingAirports/>Gerenciar Voos</a>
                                <a href="#"><Icons.RouteOutlined/>Gerenciar Rotas</a>
                                <a href="#"><Icons.Apartment/>Gerenciar Cidades</a>
                                <a href="#"><Icons.AirplanemodeActive/>Gerenciar Aeronaves</a>
                                <a href="#"><Icons.Person/>Gerenciar Usuários</a>
                            </div>
                        </div>
                        <div className="exit-area">
                                <a onClick={handleLogout}><Icons.Logout/>Sair</a>
                            </div>
                        </>
                    ):(
                        //CLOSE
                        <>
                        <div className="sidebar-header close">
                            <Icons.Menu onClick={() => setOpen(true)} htmlColor="#fff" style={{cursor:"pointer"}} fontSize="large"/>
                        </div>
                        <div className="sidebar-menu-items close">
                            <div className="active-user close">
                                <div>
                                    <img src={imagePath(user?.avatarPath!)} alt="" />
                                </div>
                            </div>
                            <div className="linkHolder">
                                <a href="#"><Icons.DashboardOutlined/></a>
                                <a href="#"><Icons.ConnectingAirports/></a>
                                <a href="#"><Icons.RouteOutlined/></a>
                                <a href="#"><Icons.Apartment/></a>
                                <a href="#"><Icons.AirplanemodeActive/></a>
                                <a href="#"><Icons.Person/></a>
                            </div>
                        </div>
                        <div className="exit-area close">
                            <Icons.Logout onClick={handleLogout} htmlColor="#fff" style={{cursor:"pointer"}}/>
                        </div>
                        </>
                    )
                }
            </nav>         
        </aside>
    )
}

export default Sidebar