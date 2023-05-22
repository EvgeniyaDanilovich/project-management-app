import { instance } from './api';
import { Column } from '../models/columns-interfaces';
import { ResultCodes } from '../enums/enums';

export const columnsAPI = {
    async getColumnsInBoard(boardId: string) {
        const response = await instance.get<Column[]>(`boards/${boardId}/columns`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async createColumn(boardId: string, title: string, order: number) {
        const response = await instance.post<Column>(`boards/${boardId}/columns`, { title, order });
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async updateColumn(boardId: string, columnId: string, title: string, order: number) {
        const response = await instance.put<Column>(`boards/${boardId}/columns/${columnId}`, { title, order });
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async deleteColumn(boardId: string, columnId: string) {
        const response = await instance.delete<Column>(`boards/${boardId}/columns/${columnId}`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    }
};