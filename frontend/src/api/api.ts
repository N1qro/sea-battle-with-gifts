import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export function AxiosSettings({children} : {children: JSX.Element }) {
    // Использую его как отдельный компонент, так как нужно вызывать хуки внутри интерсептора
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
        } else {
            delete api.defaults.headers.common["Authorization"]
        }
    }, [user])

    return children;
}

export default api