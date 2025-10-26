import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const api = axios.create({
    baseURL: "http://localhost:3001"
})

export default api