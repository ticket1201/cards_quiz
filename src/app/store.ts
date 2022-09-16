import {combineReducers, legacy_createStore} from 'redux';
import {authReducer} from '../features/Login/auth_reducer';

const rootReducer = combineReducers({
    auth: authReducer
     /// some here
})

export const store = legacy_createStore(rootReducer) // u can add middleware after coma symbol

// @ts-ignore
window.store = store