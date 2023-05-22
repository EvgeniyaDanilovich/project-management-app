import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentBoardId } from '../models/boards-interfaces';

export interface IAppInitState{
    updatedTitle: string
}

const appInitState: IAppInitState = {
    updatedTitle: ''
};

const AppSlice = createSlice({
    name: 'columns',
    initialState: appInitState,
    reducers:{
        setUpdatedTitle(state, action: PayloadAction<ICurrentBoardId>) {
            // state.boards.find(board => {
            //     if (board._id === action.payload.boardId) {
            //         state.updatedBoardTitle = board.title;
            //     }
            // });
        },

        resetUpdatedTitle(state) {
            state.updatedTitle = '';
        }
    },
    extraReducers: (builder) => {}
});

export const { setUpdatedTitle, resetUpdatedTitle } = AppSlice.actions;
export default AppSlice.reducer;