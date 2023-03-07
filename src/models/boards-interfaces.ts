import { User } from './auth-interfaces';

export interface Board {
    _id:	string
    title:	string
    owner:	string
    users:	User[]
}

export interface IBoardInitState {
    boards: Board[];
    updatedBoardTitle: string;
    currentBoardTitle: string;
    // currentBoardId: string;
}

export interface ICreateUpdateFormValue {
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
    title: string
}

export interface ICurrentBoardId {
    boardId: string
}

export interface BoardProps {
    title: string;
    boardId: string;
}