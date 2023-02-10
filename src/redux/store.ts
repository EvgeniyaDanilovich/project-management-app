import { Action, applyMiddleware, combineReducers, compose, configureStore, createStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';

export type RootStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type TBaseThunk<A extends Action, R = void> = ThunkAction<R, RootStateType, unknown, A>

const rootReducer = combineReducers({
    auth: authReducer
});

export const store = configureStore({
    reducer: rootReducer
});

// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
// export const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunkMiddleware)
// ));