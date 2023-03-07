import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { taskAPI } from '../api/task-api';
import { createTaskThunkData, Task, TaskByIdThunkData, TaskThunkData, UpdateTaskThunkData } from '../models/task-interfaces';

export interface IInitTaskState {
    tasks: Task[];
}

const initTaskState: IInitTaskState = {
    tasks: []
};

export const getTasksInColumn = createAsyncThunk(
    'task/getTasksInColumn',
    async (data: TaskThunkData) => {
        return await taskAPI.getTasksInColumn(data.boardId, data.columnId);
    }
);

export const createTask = createAsyncThunk(
    'task/createTask',
    async (data: createTaskThunkData) => {
        return await taskAPI.createTask(data.boardId, data.columnId, data.data);
    }
);

export const getTaskById = createAsyncThunk(
    'task/getTaskById',
    async (data: TaskByIdThunkData) => {
        return await taskAPI.getTaskById(data.boardId, data.columnId, data.taskId);
    }
);

export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (data: UpdateTaskThunkData) => {
        return await taskAPI.updateTaskById(data.boardId, data.columnId, data.taskId, data.data);
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (data: TaskByIdThunkData) => {
        return await taskAPI.deleteTaskById(data.boardId, data.columnId, data.taskId);
    }
);

const TaskSlice = createSlice({
        name: 'task',
        initialState: initTaskState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getTasksInColumn.fulfilled, (state, { payload }) => {

                })
                .addCase(createTask.fulfilled, (state, { payload }) => {

                })
                .addCase(getTaskById.fulfilled, (state, { payload }) => {

                })
                .addCase(updateTask.fulfilled, (state, { payload }) => {

                })
                .addCase(deleteTask.fulfilled, (state, { payload }) => {

                });
        }
    }
);

export default TaskSlice.reducer;