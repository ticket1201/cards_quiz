import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {authReducer} from '../features/Login/auth_reducer';
import {appReducer} from './app_reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
     /// add your reducer here
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type RootStateType = ReturnType<typeof store.getState>

export type RootActionsType = AnyAction // Replace it with ACs types

// types for custom dispatch hook

export type RootDispatchType = ThunkDispatch<RootStateType, unknown, RootActionsType>


// types to dispatch thunks from thunks

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store