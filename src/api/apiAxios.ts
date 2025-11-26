import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface ApiError {
    status: number;
    data: any;
}

// экземпляр аксиос с настройками
const axiosInstance = axios.create({
    baseURL: 'https://tasks-service-maks1394.amvera.io',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosBaseQuery = (): BaseQueryFn<
{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
},
unknown,
ApiError
> => async ({
    url, method, data, params,
}) => {
    try {
        // Используем data ИЛИ body (для совместимости)
        const requestData = data;

        const config: AxiosRequestConfig = {
            url,
            method,
            data: requestData,
            params,
        };

        const result = await axiosInstance.request(config);
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status || 500,
                data: err.response?.data || err.message,
            },
        };
    }
};
