import { InferActionsTypes, TBaseThunk } from '../redux/store';
import { authActions } from '../redux/auth-reducer';

export type TAuthActions = InferActionsTypes<typeof authActions>
export type TAuthThunk = TBaseThunk<TAuthActions>