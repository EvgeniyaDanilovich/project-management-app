import { instance } from './api';
import { ResultCodes } from '../enums/enums';
import { Board } from '../models/boards-interfaces';

export const boardsAPI = {
    async getAllBoards() {
        const response = await instance.get<Board[]>('boards');

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async getAllBoardsByUserId(userId: string) {
        const response = await instance.get<Board[]>(`boardsSet/${userId}`);

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async getBoardById(boardId: string) {
        await instance.get<Board>(`boards/${boardId}`);
    },

    async createBoard(title: string, owner: string, users: string[]) {
        const response = await instance.post<Board[]>('boards', { title, owner, users });

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async updateBoard(boardId: string, title: string, owner: string, users: string[]) {
        const response = await instance.put<Board>(`boards/${boardId}`, { title, owner, users });
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async deleteBoard(boardId: string) {
        const response = await instance.delete<Board>(`boards/${boardId}`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    }

};