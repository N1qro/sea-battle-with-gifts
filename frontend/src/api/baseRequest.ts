import {serverResponses} from "../types/general.ts";
import api from "./api";
import {AxiosError} from "axios";

export const baseRequest = async (url: string, data?: object): Promise<{ status: serverResponses, response: any }> => {
    try {
        const response = data ? await api.post(url, data) : await api.get(url)
        return {
            status: response.status === 200 ? serverResponses.success : serverResponses.error,
            response: response.data
        }
    } catch (e) {
        if (e instanceof AxiosError && e.response && e.response.status === 401) {
            return {status: serverResponses.error, response: 'unauthorized'}
        } else {
            return {status: serverResponses.error, response: "Internal server error"}
        }
    }
}