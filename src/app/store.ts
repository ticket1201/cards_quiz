import {combineReducers, legacy_createStore} from 'redux';
import {authReducer} from '../features/Login/auth_reducer';
import {appReducer} from './app_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
     /// some here
})

export const store = legacy_createStore(rootReducer) // u can add middleware after coma symbol

// @ts-ignore
window.store = store