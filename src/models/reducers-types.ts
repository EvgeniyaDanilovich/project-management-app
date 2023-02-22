export interface AuthInitState {
    id: null | string,
    name: null | string,
    login: null | string,
    token: null | string,
    isAuth: boolean
}

export interface IsAuthValue {
    value: boolean;
}

export interface IUserId {
    id: string;
}