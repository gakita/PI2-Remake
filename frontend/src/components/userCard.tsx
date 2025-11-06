import { useAuth } from "../services/authContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DropdownMenu from "./DropdownMenu"
import { imagePath } from "../hooks/imagePath";

interface UserCardProps {
    showDropdown?: boolean;
    homePage?: boolean;
}

function UserCard({ showDropdown = false, homePage = true }: UserCardProps){
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)
    
    const apiURL = import.meta.env.VITE_API_URL

    return(
        <>
        {user ? (
                <div className={["userCard", dropDown ? "active" : ""].join(" ")}  onClick={showDropdown ? () => setDropDown(!dropDown) : undefined}>
                  {
                    homePage ? (
                        <div className="user-card">
                            <div className="user-info">
                                <img src={`${apiURL}/uploads/${user.avatarPath}`} alt="" />
                                <p>{user.name}</p>
                                {showDropdown && <i className={dropDown ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>}
                            </div>
                          </div>
                    ) : (
                        <div className="">
                            <img src={imagePath(user.avatarPath)} alt="" />
                            <div>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                          </div>
                    )
                  }
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
