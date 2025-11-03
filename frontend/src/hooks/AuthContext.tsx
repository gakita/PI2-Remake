import React, {useState, useEffect} from "react";
import {AuthContext, User} from "../services/authContext";

export function AuthProvider({ children}: {children: React.ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }
    }, [])
    
    function login(userData:User, tokenValue:string){
        setUser(userData)
        setToken(tokenValue)
        localStorage.setItem('token', tokenValue)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function logout(){
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return(
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}