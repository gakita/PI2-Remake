
import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/AdminDashBoardIndex.css"
import UserCard from "./userCard"
import { imagePath } from "../hooks/imagePath"
import * as Icons from '@mui/icons-material';


interface SidebarProps {
    isOpen: boolean;
    onToggle?: (isOpen: boolean) => void;
}

function Sidebar({isOpen, onToggle}: SidebarProps){

    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [open,setOpen] = useState(isOpen)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleToggle = (nextOpen: boolean) => {
        setOpen(nextOpen)
        onToggle?.(nextOpen)
    }
    
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
                            <Icons.Close onClick={() => handleToggle(false)} htmlColor="#fff" style={{cursor:"pointer"}}/>
                        </div>
                        <div className="sidebar-menu">
                            <div className="active-user">
                                <p>ADMIN</p>
                                <UserCard homePage={false}/>
                            </div>
                            <div className="sidebar-menu-items">
                                <p>MENU</p>
                                <a href="/admin"><Icons.DashboardOutlined/>Dashboard</a>
                                <a href="/admin/voos"><Icons.ConnectingAirports/>Gerenciar Voos</a>
                                <a href="/admin/rotas"><Icons.RouteOutlined/>Gerenciar Rotas</a>
                                <a href="/admin/cidades"><Icons.Apartment/>Gerenciar Cidades</a>
                                <a href="/admin/aeronaves"><Icons.AirplanemodeActive/>Gerenciar Aeronaves</a>
                                <a href="/admin/usuarios"><Icons.Person/>Gerenciar Usuários</a>
                            </div>
                        </div>
                        <div className="exit-area">
                                <a href="/admin/configuracoes"><Icons.Settings/>Configurações</a>
                                <a onClick={handleLogout}><Icons.Logout/>Sair</a>
                            </div>
                        </>
                    ):(
                        //CLOSE
                        <>
                        <div className="sidebar-header close">
                            <Icons.Menu onClick={() => handleToggle(true)} htmlColor="#fff" style={{cursor:"pointer"}} fontSize="large"/>
                        </div>
                        <div className="sidebar-menu-items close">
                            <div className="active-user close">
                                <div>
                                    <img src={imagePath(user?.avatarPath!)} alt="" />
                                </div>
                            </div>
                            <div className="linkHolder">
                                <a href="/admin"><Icons.DashboardOutlined/></a>
                                <a href="/admin/voos"><Icons.ConnectingAirports/></a>
                                <a href="/admin/rotas"><Icons.RouteOutlined/></a>
                                <a href="/admin/cidades"><Icons.Apartment/></a>
                                <a href="/admin/aeronaves"><Icons.AirplanemodeActive/></a>
                                <a href="/admin/usuarios"><Icons.Person/></a>
                            </div>
                        </div>
                        <div className="exit-area close">
                            <a href="/admin/configuracoes"><Icons.Settings/></a>
                            <a onClick={handleLogout}><Icons.Logout/></a>
                        </div>
                        </>
                    )
                }
            </nav>         
        </aside>
    )
}

export default Sidebar
