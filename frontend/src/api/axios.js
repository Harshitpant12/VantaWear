import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    withCredentials: true
})

// will implement interceptors later
export default api;