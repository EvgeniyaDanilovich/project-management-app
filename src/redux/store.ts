import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import boardsReducer from './boards-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    boards: boardsReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
