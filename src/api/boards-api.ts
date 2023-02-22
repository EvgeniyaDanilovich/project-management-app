import { instance } from './api';
import { ResultCodes } from '../enums/enums';
import { Board } from '../models/common';

export const boardsAPI = {
    async getBoards() {
        const response = await instance.get<Board[]>('boards');

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },
    async createBoard(title: string, owner: string, users: string[]) {
        const response = await instance.post<Board[]>('boards', {title, owner, users});

        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

};