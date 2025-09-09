import axios from "axios"

export const vtbQuery = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 100000,
    headers: {},
})

vtbQuery.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message)
        return Promise.reject(error)
    }
)
