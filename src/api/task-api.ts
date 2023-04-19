import { instance } from './api';
import { ITask, UpdateTaskThunkDataBody } from '../models/task-interfaces';
import { createTaskData } from '../models/api-interfaces';
import { ResultCodes } from '../enums/enums';

export const taskAPI = {
    async getTasksInColumn(boardId: string, columnId: string) {
        const response = await instance.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async getTaskById(boardId: string, columnId: string, taskId: string) {
        const response = await instance.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async createTask(boardId: string, columnId: string, data: createTaskData) {
        const response = await instance.post<ITask>(`boards/${boardId}/columns/${columnId}/tasks`, data);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },


    async updateTaskById(boardId: string, columnId: string, taskId: string, data: UpdateTaskThunkDataBody) {
        const response = await instance.put<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, data);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    },

    async deleteTaskById(boardId: string, columnId: string, taskId: string) {
        const response = await instance.delete<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
        if (response.status === ResultCodes.SUCCESS && response) {
            return response.data;
        }
    }
};