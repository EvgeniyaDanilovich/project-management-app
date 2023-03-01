import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColumnData, IColumnInitState } from '../models/columns-interfaces';
import { columnsAPI } from '../api/columns-api';

const columnInitState: IColumnInitState = {
    columns: []
};

export const createColumn = createAsyncThunk(
    'column/createColumn',
    async (data: ColumnData) => {
        return await columnsAPI.createColumn(data.boardId, data.title, data.order);
    }
);

export const getColumns = createAsyncThunk(
    'column/getColumns',
    async (boardId: string) => {
        return await columnsAPI.getColumnsInBoard(boardId);
    }
);


const ColumnsSlice = createSlice({
    name: 'columns',
    initialState: columnInitState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColumns.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.columns = payload;
                }
            })
            .addCase(createColumn.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.columns.push(payload);
                }
            });
    }
});

export default ColumnsSlice.reducer;