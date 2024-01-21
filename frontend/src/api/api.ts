import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

async function refreshToken(refreshToken: string) {
    const response = await api.post('user/auth/refresh/', { refresh: refreshToken });
    return response.data;
}

export function AxiosSettings({children} : {children: JSX.Element }) {
    const { user, login } = useAuth()

    useEffect(() => {
        if (user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
        } else {
            delete api.defaults.headers.common["Authorization"]
        }
    }, [user])

    useEffect(() => {
        const JWTUpdater = api.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config

                if (error.response && error.response.status === 401 && user && !originalRequest._retry) {
                    originalRequest._retry = true
                    const data = await refreshToken(user.refreshToken)
                    
                    login({
                        ...user,
                        "accessToken": data.access,
                        "refreshToken": data.refresh,
                    })
                    
                    originalRequest.headers["Authorization"] = `Bearer ${data.access}`
                    return api(error.config)
                } 

                return Promise.reject(error)
            }
        )

        return () => api.interceptors.response.eject(JWTUpdater)
    }, [])

    return children;
}

export default api