import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsAPI } from '../api/boards-api';
import { IBoardInitState, ICreateBoardData, ICurrentBoardId, ICurrentBoardTitle, IUpdateBoardData } from '../models/boards-interfaces';

const initialBoardsState: IBoardInitState = {
    boards: [],
    updatedBoardTitle: '',
    currentBoardTitle: '',
};

export const getAllBoardsTC = createAsyncThunk(
    'boards/getAll',
    async () => {
        return await boardsAPI.getAllBoards();
    }
);

export const getAllBoardsByUserIdTC = createAsyncThunk(
    'boards/getAllByCurrentUser',
    async (userId: string) => {
        return await boardsAPI.getAllBoardsByUserId(userId);
    }
);

export const getBoardById = createAsyncThunk(
    'boards/getBoardById',
    async (boardId: string) => {
        return await boardsAPI.getBoardById(boardId);
    }
);


export const createBoardTC = createAsyncThunk(
    'boards/createBoard',
    async (data: ICreateBoardData) => {
        return await boardsAPI.createBoard(data.title, data.userId, []);
    }
);

export const updateBoard = createAsyncThunk(
    'boards/updateBoard',
    async (data: IUpdateBoardData) => {
        return await boardsAPI.updateBoard(data.boardId, data.title, data.owner, data.users);
    }
);

export const removeBoard = createAsyncThunk(
    'boards/deleteBoard',
    async (boardId: string) => {
        return await boardsAPI.deleteBoard(boardId);
    }
);

const BoardsSlice = createSlice({
    name: 'boards',
    initialState: initialBoardsState,
    reducers: {
        setUpdatedBoardTitle(state, action: PayloadAction<ICurrentBoardId>) {
            state.boards.find(board => {
                if (board._id === action.payload.boardId) {
                    state.updatedBoardTitle = board.title;
                }
            });
        },

        resetUpdatedBoardTitle(state) {
            state.updatedBoardTitle = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBoardsTC.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.boards = payload;
                }
            })

            .addCase(getAllBoardsByUserIdTC.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.boards = payload;
                }
            })

            .addCase(getBoardById.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.currentBoardTitle = payload.title;
                }
            })

            .addCase(createBoardTC.fulfilled, (state, { payload }) => {
                if (payload) {
                    // @ts-ignore
                    state.boards.push(payload);
                }
            })

            .addCase(updateBoard.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.currentBoardTitle = payload.title;
                }
            })

            .addCase(removeBoard.fulfilled, (state, { payload }) => {
                if (payload) {
                    const index = state.boards.findIndex((board) => {
                        return board._id === payload._id;
                    });

                    state.boards.splice(index, 1);
                }
            });
    }
});

export const { setUpdatedBoardTitle, resetUpdatedBoardTitle } = BoardsSlice.actions;
export default BoardsSlice.reducer;