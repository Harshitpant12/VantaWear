import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true
})

// will implement interceptors later
export default api;