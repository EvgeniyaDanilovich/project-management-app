import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskAPI } from '../api/task-api';
import { createTaskThunkData, IInitTaskState, ITaskId, TaskByIdThunkData, TaskThunkData, UpdateTaskThunkData } from '../models/task-interfaces';
import { ICreateUpdateFormValue } from '../models/forms-interfaces';

const initTaskState: IInitTaskState = {
    tasks: [],
    currentTaskTitle: '',
    currentTaskDescription: '',
    // updatedTaskTitle: '',
    // updatedTaskDescription: '',
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
        reducers: {
            resetTasks(state) {
                state.tasks = [];
            },

            setCurrentTaskData(state, action: PayloadAction<ICreateUpdateFormValue>) {
                state.currentTaskTitle = action.payload.title;
                if (action.payload.description) {
                    state.currentTaskDescription = action.payload.description;
                }
            },
            // setUpdatedTaskData(state, action: PayloadAction<ITaskId>) {
            //     state.tasks.map(task => {
            //         if (task._id === action.payload.taskId) {
            //             state.updatedTaskTitle = task.title;
            //             if (task.description) {
            //                 state.updatedTaskDescription = task.description;
            //             }
            //         }
            //     });
            // },
            // resetUpdatedTaskData(state) {
            //     state.updatedTaskTitle = '';
            //     state.updatedTaskDescription = '';
            // }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getTasksInColumn.fulfilled, (state, { payload }) => {
                    if (payload) {
                        state.tasks = [...state.tasks, ...payload];
                    }
                })
                .addCase(createTask.fulfilled, (state, { payload }) => {
                    if (payload) {
                        state.tasks.push(payload);
                    }
                })
                .addCase(getTaskById.fulfilled, (state, { payload }) => {

                })
                .addCase(updateTask.fulfilled, (state, { payload }) => {
                    if (payload) {
                        const index = state.tasks.findIndex(task => {
                            return task._id === payload._id;
                        });

                        state.tasks[index].title = payload.title;
                        state.tasks[index].description = payload.description;
                    }
                })
                .addCase(deleteTask.fulfilled, (state, { payload }) => {
                    const index = state.tasks.findIndex(task => {
                        if (payload) {
                            return task._id === payload._id;
                        }
                    });

                    state.tasks.splice(index, 1);
                });
        }
    }
);

export const { resetTasks } = TaskSlice.actions;
export default TaskSlice.reducer;