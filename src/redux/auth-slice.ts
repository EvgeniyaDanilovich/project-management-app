import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth-api';
import { AuthInitState, IsAuthValue, IToken, IUserId } from '../models/auth-interfaces';
import { ISignInFormValues, ISignUpFormValues } from '../models/forms-interfaces';
import { ISignInResponse, ISignUpResponse } from '../models/api-interfaces';
import { setToken, setUserId } from '../utils/localStorage';

export const initialAuthState: AuthInitState = {
    id: '',
    name: '',
    login: '',
    token: '',
    isAuth: false
};

export const singInTC = createAsyncThunk(
    'auth/signIn',
    async (data: ISignInFormValues) => {
        const response = await authAPI.signIn(data.login, data.password);
        if (response) {
            setToken(response.token);
        }
        return response;
    }
);

export const singUpTC = createAsyncThunk(
    'auth/signUp',
    async (data: ISignUpFormValues) => {
        const response = await authAPI.signUp(data.name, data.login, data.password);
        if (response) {
            setUserId(response._id);
        }
        return response;
    }
);

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsAuth(state, action: PayloadAction<IsAuthValue>) {
            state.isAuth = action.payload.value;
        },
        setStateUserId(state, action: PayloadAction<IUserId>) {
            if (action.payload.id) {
                state.id = action.payload.id;
            }
        },
        setTokenState(state, action: PayloadAction<IToken>) {
            state.token = action.payload.token;
        },
        resetUserData(state) {
            state.token = '';
            state.login = '';
        },

    },
    extraReducers: {
        [singInTC.fulfilled.type]: (state, action: PayloadAction<ISignInResponse>) => {
            state.isAuth = true;
            state.token = action.payload.token;
        },
        [singUpTC.fulfilled.type]: (state, action: PayloadAction<ISignUpResponse>) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.login = action.payload.login;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(singInTC.fulfilled, (state, action) => {
    //         state.isAuth = true;
    //     });
    //     builder.addCase(singUpTC.fulfilled, (state, action) => {
    //         if (action.payload) {
    //             state.id = action.payload._id;
    //             state.name = action.payload.name;
    //             state.login = action.payload.login;
    //         }
    //     });
    // }
});

export const { setIsAuth, setStateUserId, setTokenState, resetUserData } = AuthSlice.actions;
export default AuthSlice.reducer;


