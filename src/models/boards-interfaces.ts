import { User } from './auth-interfaces';

export interface Board {
    _id:	string
    title:	string
    owner:	string
    users:	User[]
}

export interface IBoardInitState {
    boards: Board[];
    currentBoardTitle: string;
    isPersist: boolean
}

export interface IBoardFormValue {
    title: string;
    // description: string
}

export interface IUpdateBoardData{
    boardId: string,
    title: string,
    owner: string,
    users: []
}

export interface ICreateBoardData {
    title: string,
    userId: string
}

export interface ICurrentBoardTitle {
    boardId: string
}

export interface BoardFormProps {
    submitAction: (data: IBoardFormValue) => void;
    closeWindow: (status: boolean) => void;
    keyWord: string
}