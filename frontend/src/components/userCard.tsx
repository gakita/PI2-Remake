import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DropdownMenu from "./DropdownMenu"

interface UserCardProps {
    showDropdown?: boolean;
}

function UserCard({ showDropdown = false }: UserCardProps){
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)
    
    const apiURL = import.meta.env.VITE_API_URL

    return(
        <>
        {user ? (
                <div className={["userCard", dropDown ? "active" : ""].join(" ")}  onClick={showDropdown ? () => setDropDown(!dropDown) : undefined}>
                  <div className="user-info">
                    <img src={`${apiURL}/uploads/${user.avatarPath}`} alt="" />
                    <p>{user.name}</p>
                    {showDropdown && <i className={dropDown ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>}
                  </div>
                  {showDropdown && <DropdownMenu isOpen={dropDown} toggle={() => setDropDown(!dropDown)} />}
                </div>
              )
              :
              <li><a href="/login">Login</a></li>
            }
        </>
    )
}

export default UserCard
