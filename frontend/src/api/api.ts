import axios from 'axios';
// import useAuth from '../hooks/useAuth';
// import {FC, useEffect} from 'react';
import getSessionStorageUser from "../utils/getSessionStorageUser.ts";
import setSessionStorageUser from "../utils/setSessionStorageUser.ts";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        "Content-Type": "application/json",
    },
})

// т.к. токены доступны только через хуки пришлось доставать их из sessionStorage, либо чтобы нормально
// выглядело надо переходить на redux или zustand, они разрешают использовать контекст везде.
// Также с хуками проблема: они при перезагрузке страницы не успевают установить headers (запрос на сервер делается раньше).
// Теперь можно вообще убрать токены из контекста
api.interceptors.request.use(
    (config) => {
        const user = getSessionStorageUser()
        if (user) {
            config.headers["Authorization"] = `Bearer ${user.accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        const config = err.config
        if (err.response.status === 401) {
            config._retry = true
            try {
                const user = getSessionStorageUser()
                if (user) {
                    const response = await api.post('/user/auth/refresh', {
                        refreshToken: user.refreshToken
                    })
                    user.accessToken = response.data.accessToken
                    setSessionStorageUser(user)
                    return api(config)
                }
                return Promise.reject('unauthorized')
            } catch (e) {
                return Promise.reject(e)
            }
        }
        return Promise.reject(err)
    }
)

// export function AxiosSettings({children}: { children: FC }) {
//     // Использую его как отдельный компонент, так как нужно вызывать хуки внутри интерсептора
//     const {user} = useAuth()
//
//     useEffect(() => {
//         if (user) {
//             api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
//         } else {
//             delete api.defaults.headers.common["Authorization"]
//         }
//     }, [user])
//
//     return children;
// }
//
export default api