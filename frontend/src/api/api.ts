import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export function AxiosSettings({children} : {children: JSX.Element }) {
    // Использую его как отдельный компонент, так как нужно вызывать хуки внутри интерсептора
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            console.log(`SET AS HEADER: ${user.accessToken}`)
            api.defaults.headers.common["HTTP_AUTHORIZATION"] = `Bearer ${user.accessToken}`
        }
    }, [user])

    return children;
}

export default api