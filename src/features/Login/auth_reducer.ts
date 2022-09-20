import {authAPI, AuthResponseType, LoginParamsType, RegisterParamsType, SetPasswordDataType} from '../../api/api';
import {RootThunkType} from '../../app/store';
import axios, {AxiosError} from 'axios';
import {setAppIsInitializedAC, setAppStatusAC, setAppSuccessAC} from '../../app/app_reducer';
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
            return {...state, ...action.payload}
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
    setAppStatusAC('loading')
    try {
        const res = await authAPI.me()
        dispatch(setAppIsInitializedAC(true))
        dispatch(AuthMeAC(res.data))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        setAppStatusAC('idle')
    }
}

export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch) => {
    try {
        const res = await authAPI.login(data)
        dispatch(SetLoginDataAC(res.data))
    } catch (e: any) {
        errorUtils(e, dispatch)
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

export const registerTC = (data: RegisterParamsType): RootThunkType<Promise<boolean>> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.register(data)
        .then(() => {
            // console.log('register, ', res)
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppSuccessAC('You are successfully registered'))
            return true
        })
        .catch(e => {
            dispatch(setAppStatusAC('failed'))
            errorUtils(e, dispatch)
            return false
        })

}