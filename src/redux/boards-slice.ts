import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { boardsAPI } from '../api/boards-api';
import { Board } from '../models/common';

interface IBoardInitState {
    boards: Board[];
    isPersist: boolean
}

const initialBoardsState: IBoardInitState = {
    boards: [],
    isPersist: false
};

export const getBoardsTC = createAsyncThunk(
    'boards/getAll',
    async () => {
        return await boardsAPI.getBoards();
    }
);

export const createBoardTC = createAsyncThunk(
    'boards/createBoard',
    async (data: { title: string, userId: string }) => {
        const response = await boardsAPI.createBoard(data.title, data.userId, []);
        console.log(response);
        return response;

    }
);

const BoardsSlice = createSlice({
    name: 'boards',
    initialState: initialBoardsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBoardsTC.fulfilled, (state, { payload }) => {
            if (payload) {
                state.boards = payload;
            }
        });
        builder.addCase(createBoardTC.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (payload) {
                // @ts-ignore
                state.boards.push(payload);
                state.isPersist = true;
            }
        });
    }
});

export default BoardsSlice.reducer;