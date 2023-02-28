import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsAPI } from '../api/boards-api';
import { Board, IBoardInitState, ICreateBoardData, ICurrentBoardTitle, IUpdateBoardData } from '../models/boards-interfaces';

const initialBoardsState: IBoardInitState = {
    boards: [],
    currentBoardTitle: '',
    isPersist: false
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
        setCurrentBoardTitle(state, action: PayloadAction<ICurrentBoardTitle>) {
            state.boards.find(board => {
                if (board._id === action.payload.boardId) {
                    state.currentBoardTitle = board.title;
                }
            });
        },

        resetCurrentBoardTitle(state) {
            state.currentBoardTitle = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBoardsTC.fulfilled, (state, { payload }) => {
            if (payload) {
                state.boards = payload;
            }
        });

        builder.addCase(createBoardTC.fulfilled, (state, { payload }) => {
            if (payload) {
                console.log(payload);
                // @ts-ignore
                state.boards.push(payload);
                state.isPersist = true;
            }
        });

        builder.addCase(getAllBoardsByUserIdTC.fulfilled, (state, { payload }) => {
            if (payload) {
                state.boards = payload;
            }
        });

        builder.addCase(updateBoard.fulfilled, (state, { payload }) => {
            if (payload) {
                state.boards.find((board) => {
                    if (board._id === payload._id) {
                        board.title = payload.title;
                    }
                });
            }
        });

        builder.addCase(removeBoard.fulfilled, (state, { payload }) => {
            if (payload) {
                const index =  state.boards.findIndex((board) => {
                    return board._id === payload._id
                })

                state.boards.splice(index, 1);
            }
        });
    }
});

export const { setCurrentBoardTitle, resetCurrentBoardTitle } = BoardsSlice.actions;
export default BoardsSlice.reducer;