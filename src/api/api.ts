import axios from 'axios';
import { getToken } from '../utils/localStorage';

const token = getToken();

export const instance = axios.create({
    baseURL: 'https://m-app-back-production.up.railway.app/',
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${token}`
    }
});