import {authAPI, AuthResponseType, LoginParamsType} from '../../api/api';
import {RootThunkType} from '../../app/store';
import axios, {AxiosError} from 'axios';

type InitialStateType = {
    _id: string | null
}

const initialState = {} as InitialStateType

type AuthMeACType = ReturnType<typeof AuthMeAC>
type SetLoginDataACType = ReturnType<typeof SetLoginDataAC>
type LogoutACType = ReturnType<typeof LogoutAC>
export type ActionsType = AuthMeACType | SetLoginDataACType | LogoutACType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/AUTH_ME':
            return {...state, ...action.payload}
        case 'auth/SET_LOGIN_DATA':
            return {...state, ...action.payload}
        case 'auth/LOG_OUT':
            return {_id: null}
        default :
            return state
    }
}

const AuthMeAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/AUTH_ME',
        payload
    } as const
}
const SetLoginDataAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/SET_LOGIN_DATA',
        payload
    } as const
}
const LogoutAC = () => {
    return {
        type: 'auth/LOG_OUT'
    } as const
}

export const AuthMeTC = (): RootThunkType => async (dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(AuthMeAC(res.data))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message
            console.log(error)
        }
    }
}

export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch) => {
    try {
        const res = await authAPI.login(data)
        dispatch(SetLoginDataAC(res.data))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message
            console.log(error)
        }
    }
}

export const logoutTC = (): RootThunkType => async (dispatch) => {
    try {
        await authAPI.logout()
        dispatch(LogoutAC())
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message
            console.log(error)
        }
    }
}