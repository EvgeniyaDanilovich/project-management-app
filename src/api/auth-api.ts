import { instance } from './api';
import { ISignInResponse, ISignUpResponse } from '../models/api-interfaces';
import { ResultCodes } from '../enums/enums';

export const authAPI = {
    async signUp(name: string, login: string, password: string) {
        const response = await instance.post<ISignUpResponse>('auth/signup', { name, login, password });

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async signIn(login: string, password: string) {
        const response = await instance.post<ISignInResponse>('auth/signin', { login, password });

        if (response.status === ResultCodes.SUCCESS) {
            return response.data;
        }
    }
};

// const signUpUser = async (data: ISignUpFormValues) => {
//     const response = await fetch('https://m-app-back-production.up.railway.app/auth/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
//
//     const res = await response.json();
//     console.log(res);
//
//     return res;
// };