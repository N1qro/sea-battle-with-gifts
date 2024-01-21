import axios from 'axios';
import useAuth from '../hooks/useAuth';
import {ReactNode, useEffect} from 'react';
import {redirect} from "react-router-dom";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        "Content-Type": "application/json",
    },
})

export function AxiosSettings({children}: { children: ReactNode }) {
    // Использую его как отдельный компонент, так как нужно вызывать хуки внутри интерсептора
    const {user, login} = useAuth()

    useEffect(() => {
        console.log('effect 1')
        if (user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
        } else {
            delete api.defaults.headers.common["Authorization"]
        }
    }, [user])

    useEffect(() => {
        console.log('effect 2')
        const interceptor = api.interceptors.response.use(
            (res) => {
                return res
            },
            async (err) => {
                console.log(1231231312)
                const config = err.config
                if (config.url !== "user/auth/" && err.response.status === 401) {
                    config._retry = true
                    try {
                        if (user) {
                            const response = await api.post('/user/auth/refresh/', {
                                refresh: user.refreshToken
                            })
                            user.accessToken = response.data.access
                            user.refreshToken = response.data.refresh
                            login(user)
                            return api(config)
                        }
                        redirect('/login')
                        return Promise.reject('unauthorized')
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
                return Promise.reject(err)
            }
        )

        return api.interceptors.response.eject(interceptor)
    }, []);

    return children;
}

export default api