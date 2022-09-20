import {authAPI, AuthResponseType, LoginParamsType, SetPasswordDataType} from '../../api/api';
import {RootThunkType} from '../../app/store';
import axios, {AxiosError} from 'axios';
import {RegisterFormType} from './Registration/Registration';
import {setAppIsInitializedAC, setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from '../../common/utils/error-utils';

type InitialStateType = {
    _id: string | null
    email: string;
    name: string;
    avatar?: string | null;
    publicCardPacksCount: number | null;
}

const initialState = {
    _id: '',
    email: '',
    name: ''
} as InitialStateType

type AuthMeACType = ReturnType<typeof AuthMeAC>
type SetLoginDataACType = ReturnType<typeof SetLoginDataAC>
type LogoutACType = ReturnType<typeof LogoutAC>
export type ActionsType = AuthMeACType | SetLoginDataACType | LogoutACType

export const authReducer = (state = initialState, action: ActionsType): any => {
    switch (action.type) {
        case 'auth/AUTH_ME':
        case 'auth/SET_LOGIN_DATA':
            return {...state, ...action.payload}
        case 'auth/LOG_OUT':
            return {_id: '', email: '', name: '', avatar: null, publicCardPacksCount: null}
        default :
            return state
    }
}

export const AuthMeAC = (payload: AuthResponseType) => {
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
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        dispatch(setAppIsInitializedAC(true))
        dispatch(AuthMeAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        errorUtils(err, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(SetLoginDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        errorUtils(err, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

export const logoutTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
        dispatch(LogoutAC())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        errorUtils(err, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

export const ForgotPassTC = ({email}: { email: string }): RootThunkType => async (dispatch) => {
    try {
        let res = await authAPI.forgotPassword({email, ...{'message': '<div style="padding: 15px">\npassword recovery link: \n<a href=\'http://localhost:3000/#/set-new-password/$token$\'>\nlink</a>\n</div>'}})
    } catch (e) {
        console.log(e)
    }
}

export const setNewPassTC = (data: SetPasswordDataType): RootThunkType => async (dispatch) => {
    try {
        let res = await authAPI.setNewPassword(data)
    } catch (e) {
        console.log(e)
    }
}

export const registerTC = (data: RegisterFormType): RootThunkType<Promise<boolean>> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.register(data)
        .then(() => {
            // console.log('register, ', res)
            dispatch(setAppStatusAC('succeeded'))
            return true
        })
        .catch(e => {
            dispatch(setAppStatusAC('failed'))
            errorUtils(e, dispatch)
            return false
        })

}