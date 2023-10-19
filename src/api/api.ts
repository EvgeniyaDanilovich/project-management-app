import axios from 'axios';
import { getToken } from '../utils/localStorage';

const token = getToken();

export const instance = axios.create({
    // baseURL: 'https://m-app-back-production.up.railway.app/',
    // baseURL: 'https://m-app-back.herokuapp.com/',
    baseURL: 'https://management-app-back-6474cd70183b.herokuapp.com/',
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

instance.interceptors.request.use(
    async (config) => {
        const token = getToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        Promise.reject(error);
    });
