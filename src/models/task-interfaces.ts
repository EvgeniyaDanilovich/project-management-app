import { createTaskData } from './api-interfaces';

export interface Task {
    _id: string;
    title: string;
    order: number;
    boardId: string;
    columnId: string;
    description: string;
    userId: number;
    users: string[];
}

export interface createTaskThunkData {
    boardId: string;
    columnId: string;
    data: createTaskData;
}

export interface TaskThunkData {
    boardId: string;
    columnId: string;
}

export interface TaskByIdThunkData {
    boardId: string;
    columnId: string;
    taskId: string
}

export interface UpdateTaskThunkData {
    boardId: string;
    columnId: string;
    taskId: string;
    data: Task;
}