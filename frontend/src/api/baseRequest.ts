import {serverResponses} from "../types/general.ts";
import api from "./api";
import {AxiosError} from "axios";

export const baseRequest = async (url: string, requestData?: { data?: object, params?: object }): Promise<{
    status: serverResponses,
    response: any
}> => {
    try {
        console.log(1)
        const response = requestData?.data ? await api.post(url, requestData.data) : await api.get(url, requestData?.params)
        return {
            status: response.status === 200 ? serverResponses.success : serverResponses.error,
            response: response.data
        }
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            return {status: serverResponses.error, response: e.response.data}
        } else {
            return {status: serverResponses.error, response: 'Unknown error'}
        }
    }
}