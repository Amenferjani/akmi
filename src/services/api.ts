import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api` || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.errors?.[0]?.message 
            || error.response?.data?.message 
            || error.message 
            || 'Something went wrong'
        
        return Promise.reject(new Error(message))
    }
);

export default api;