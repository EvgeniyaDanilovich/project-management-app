import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData, DeleteColumnData, IColumnInitState, ICurrentColumnId, UpdateColumnData } from '../models/columns-interfaces';
import { columnsAPI } from '../api/columns-api';
import { ICurrentBoardId } from '../models/boards-interfaces';

const columnInitState: IColumnInitState = {
    columns: [],
    updatedColumnTitle: ''
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


export const updateColumn = createAsyncThunk(
    'column/updateColumn',
    async (data: UpdateColumnData) => {
        return await columnsAPI.updateColumn(data.boardId, data.columnId, data.title, 0);
    }
);

export const deleteColumn = createAsyncThunk(
    'column/deleteColumn',
    async (data: DeleteColumnData) => {
        return await columnsAPI.deleteColumn(data.boardId, data.columnId);
    }
);

const ColumnsSlice = createSlice({
    name: 'columns',
    initialState: columnInitState,
    reducers: {
        setUpdatedColumnTitle(state, action: PayloadAction<ICurrentColumnId>) {
            state.columns.find(column => {
                if (column._id === action.payload.columnId) {
                    state.updatedColumnTitle = column.title;
                }
            });
        },

        resetUpdatedColumnTitle(state) {
            state.updatedColumnTitle = '';
        }
    },
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
            })
            .addCase(updateColumn.fulfilled, (state, { payload }) => {
                if (payload) {
                    console.log(state.columns);
                    state.columns.map(column => {
                        if (column._id === payload._id) {
                            column.title = payload.title;
                        }
                    });
                }
            })

            .addCase(deleteColumn.fulfilled, (state, { payload }) => {
                if (payload) {
                    const index = state.columns.findIndex(column => {
                        return column._id === payload._id;
                    });

                    state.columns.splice(index, 1);
                }
            });
    }
});

export const { setUpdatedColumnTitle, resetUpdatedColumnTitle } = ColumnsSlice.actions;
export default ColumnsSlice.reducer;