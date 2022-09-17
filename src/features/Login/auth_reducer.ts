import {authAPI, AuthResponseType, LoginParamsType} from '../../api/api';
import {RootThunkType} from '../../app/store';
import axios, {AxiosError} from 'axios';

type InitialStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод

    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean   // подтвердил ли почту
    rememberMe: boolean

    error?: string
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    isLoggedIn: false
}

type AuthMeACType = ReturnType<typeof AuthMeAC>
type SetLoginDataACType = ReturnType<typeof SetLoginDataAC>
export type ActionsType = AuthMeACType | SetLoginDataACType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH_ME':
            return state
        case 'auth/SET_LOGIN_DATA':
            return {...state, ...action.payload, isLoggedIn: true}
        default :
            return state
    }
}

const AuthMeAC = (id: string) => {
    return {
        type: 'AUTH_ME',
        payload: {
            id
        }
    } as const
}
const SetLoginDataAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/SET_LOGIN_DATA',
        payload
    } as const
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