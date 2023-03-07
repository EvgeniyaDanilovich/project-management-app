export interface User {
    _id:	string
    name:	string
    login:	string
}

export interface AuthInitState {
    id: null | string,
    name: null | string,
    login: null | string,
    token: null | string,
    isAuth: Boolean
}

export interface IsAuthValue {
    value: boolean;
}

export interface IUserId {
    id: string;
}

export interface IToken{
    token: string;
}