import { createReducer } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth-api';
import { TAuthThunk } from '../models/reducers-types';
import { ISignInFormValues, ISignUpFormValues } from '../models/forms-interfaces';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    userName: null,
    login: null,
    isAuth: false
};

export const authReducer = createReducer([], builder => {
    builder
        .addCase(SET_USER_DATA, (state, action) => {
            // state.auth.data = action.payload
        });
});

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
});

export const authActions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null) => ({
        type: SET_USER_DATA,
        payload: { id, email, login }
    })
}

export const singUpTC = (data: ISignUpFormValues):TAuthThunk => (disptch) => {
    const response = authAPI.signUp(data.name, data.login, data.password);
};
export const singInTC = (data: ISignInFormValues):TAuthThunk => (disptch) => {
    const response = authAPI.signIn(data.login, data.password);
};
