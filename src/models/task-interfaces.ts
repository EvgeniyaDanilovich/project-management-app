import { createTaskData } from './api-interfaces';

export interface ITask {
    _id: string;
    title: string;
    order: number;
    boardId: string;
    columnId: string;
    description: string | undefined;
    userId: string | null;
    users: string[];
}


export interface ITaskId{
    taskId: string
}

export interface IInitTaskState {
    tasks: ITask[];
    // updatedTaskTitle: string;
    currentTaskDescription: string;
    currentTaskTitle: string;
    // updatedTaskDescription: string;
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

export interface UpdateTaskThunkDataBody {
    title: string;
    order: number;
    description: string | undefined;
    columnId: string;
    userId: string | null;
    users: number[]
}

export interface UpdateTaskThunkData {
    boardId: string;
    columnId: string;
    taskId: string;
    data: UpdateTaskThunkDataBody;
}

export interface TaskProps {
    title: string;
    boardId: string;
    columnId: string;
    taskId: string;
    description?: string;
}

export interface TaskPreviewProps {
    title: string;
    description: string | undefined;
    boardId: string;
    columnId: string;
    taskId: string
}