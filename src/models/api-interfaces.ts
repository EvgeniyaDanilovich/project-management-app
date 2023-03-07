export interface ISignUpResponse {
    _id: string;
    name: string;
    login: string;
}

export interface ISignInResponse {
    token: string;
}

export interface createTaskData {
    title: string;
    order: number;
    description: string;
    userId: string;
    users: string[];
}