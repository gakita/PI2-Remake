import { useState } from "react"
import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"

interface DropdownMenuProps {
        isOpen: boolean;
        toggle: () => void; 
    }

const DropdownMenu: React.FC<DropdownMenuProps> = ({isOpen, toggle}) => {

    if(!isOpen) return null

    const {user,logout} = useAuth()
    const navigate = useNavigate()
    let isAdmin = false
    if (user?.isAdmin){
        isAdmin = true
    }
    

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return(
        <div className="userMenu">
            <ul>
                {isAdmin ? (
                    <>
                    <li><a href="#">Minhas Viagens</a></li>
                    <li><a href="#">Configurações</a></li>
                    <li><a href="/admin">Area Admin</a></li>
                    </>
                ):(
                    <>
                    <li><a href="#">Minhas Viagens</a></li>
                    <li><a href="#">Reservas</a></li>
                    <li><a href="#">Configurações</a></li>
                    </>
                )}
                <li onClick={handleLogout}><a href="#">Sair</a></li>
            </ul>
        </div>
    )
}

    export default DropdownMenu