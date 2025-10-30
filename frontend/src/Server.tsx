import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.REACT_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
