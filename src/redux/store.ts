import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import boardsReducer from './boards-slice';
import columnsReducer from './columns-slice';
import taskReducer from './task-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    task: taskReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
