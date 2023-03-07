import { instance } from './api';
import { Task } from '../models/task-interfaces';
import { createTaskData } from '../models/api-interfaces';

export const taskAPI = {
    async getTasksInColumn(boardId: string, columnId: string) {
        const response = await instance.get<Task[]>(`boards/${boardId}/columns/${columnId}/tasks`);
    },

    async createTask(boardId: string, columnId: string, data: createTaskData) {
        const response = await instance.post<Task>(`boards/${boardId}/columns/${columnId}/tasks`, data);
    },

    async getTaskById(boardId: string, columnId: string, taskId: string) {
        const response = await instance.get<Task>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    },

    async updateTaskById(boardId: string, columnId: string, taskId: string, data: Task) {
        const response = await instance.put<Task>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    },

    async deleteTaskById(boardId: string, columnId: string, taskId: string) {
        const response = await instance.delete<Task>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    }
};