import api from "../server"

export const loginAuth = async (email: string, password: string) => {
    const response = await api.post("/login", {email, password})
    return response.data.name
}