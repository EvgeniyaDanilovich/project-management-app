import axios from 'axios';
import { getToken } from '../utils/localStorage';

const token = getToken();

export const instance = axios.create({
    // baseURL: 'https://m-app-back-production.up.railway.app/',
    baseURL: 'https://m-app-back.herokuapp.com/',
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${token}`
    }
});