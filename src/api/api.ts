import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://m-app-back-production.up.railway.app/',
    withCredentials: false,
    headers: {
        //     'API-KEY': '2fb5263a-5ecb-4413-a235-0318942ab844'
        // Authorization: `Bearer ${token}`
    }
});