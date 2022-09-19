import {authAPI, AuthResponseType, LoginParamsType, SetPasswordDataType, UpdateProfileDataType} from '../../api/api';
import {RootThunkType} from '../../app/store';
import {RegisterFormType} from './Registration/Registration';
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
type UpdateProfileACType = ReturnType<typeof UpdateProfileAC>
export type ActionsType = AuthMeACType | SetLoginDataACType | LogoutACType | UpdateProfileACType

export const authReducer = (state = initialState, action: ActionsType): any => {
    switch (action.type) {
        case 'auth/AUTH_ME':
        case 'auth/SET_LOGIN_DATA':
        case 'auth/UPDATE_PROFILE':
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
export const UpdateProfileAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/UPDATE_PROFILE',
        payload
    } as const
}

export const AuthMeTC = (): RootThunkType => async (dispatch) => {
    setAppStatusAC('loading')
    try {
        const res = await authAPI.me()
        dispatch(AuthMeAC(res.data))
    } finally {
        setAppStatusAC('idle')
        dispatch(setAppIsInitializedAC(true))
    }
}

export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(SetLoginDataAC(res.data))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const logoutTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
        dispatch(LogoutAC())
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const ForgotPassTC = ({email}: { email: string }): RootThunkType => async (dispatch) => {
    // replace url in href to your gh-page address
    const message = {'message': '<div style="padding: 15px; font-weight: bold">\n Trouble signing in? <br>\n Resetting your password is easy. <br>\n Just click on link below and follow the instructions. We’ll have you up and running in no time.  <br>\n \n <a href="https://ticket1201.github.io/cards_quiz/#/set-new-password/$token$">Link</a><br>\n If you did not make this request then please ignore this email.\n</div>'}

    dispatch(setAppStatusAC('loading'))

    try {
        await authAPI.forgotPassword({email, ...message})
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const setNewPassTC = (data: SetPasswordDataType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.setNewPassword(data)
        dispatch(setAppSuccessAC('SUCCESS'))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
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

export const updateProfileTC = (data: UpdateProfileDataType):RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try{
        let res = await authAPI.updateProfile(data)
        dispatch(UpdateProfileAC(res.data.updatedUser))
        dispatch(setAppSuccessAC('SUCCESS'))
    }
    catch (e:any){
        errorUtils(e, dispatch)
    }
    finally {
        dispatch(setAppStatusAC('idle'))
    }
}