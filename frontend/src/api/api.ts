import axios from 'axios';
import useAuth from '../hooks/useAuth';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

api.interceptors.request.use(
    config => {
        const { user } = useAuth()
        console.log(`used ${user?.accessToken}`)
        if (user?.accessToken) {
            config.headers['HTTP_AUTHORIZATION'] = `Bearer ${user.accessToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export default api