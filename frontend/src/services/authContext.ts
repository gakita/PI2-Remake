import {createContext, useContext} from "react";

export interface User {
    name: string;
    email:string;
    isAdmin: boolean;
    avatarPath: string;
}

interface AuthContextData {
    user?: User | null;
    token?: string | null;
    login: (userData: User, tokenValue: string) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextData>({
    user:null,
    token:null,
    login: () => {},
    logout: () => {},
    updateUser: () => {}
})

export const useAuth = () => useContext(AuthContext);
