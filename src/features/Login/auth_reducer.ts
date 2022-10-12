import {
    authAPI,
    AuthResponseType,
    LoginParamsType,
    RegisterParamsType,
    SetPasswordDataType,
    UpdateProfileDataType
} from '../../api/api';
import {RootThunkType} from '../../app/store';
import {setAppIsInitializedAC, setAppStatusAC, setAppSuccessAC} from '../../app/app_reducer';
import {errorUtils} from '../../common/utils/error-utils';

const initialState = {
    _id: '' as string | undefined,
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: null as number | null
}

export type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionType): AuthInitialStateType => {
    switch (action.type) {
        case 'auth/AUTH_ME':
        case 'auth/SET_LOGIN_DATA':
        case 'auth/UPDATE_PROFILE':
            return {...state, ...action.payload}
        case 'auth/LOG_OUT':
            return {_id: '', email: '', name: '', avatar: '', publicCardPacksCount: null}
        default :
            return state
    }
}

// types
type AuthMeActionType = ReturnType<typeof authMeAC>
type SetLoginDataActionType = ReturnType<typeof setLoginDataAC>
type UpdateProfileActionType = ReturnType<typeof updateProfileAC>
type LogoutActionType = ReturnType<typeof logoutAC>
export type AuthActionType =
    AuthMeActionType
    | SetLoginDataActionType
    | LogoutActionType
    | UpdateProfileActionType

// ACs
export const authMeAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/AUTH_ME',
        payload
    } as const
}
export const setLoginDataAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/SET_LOGIN_DATA',
        payload
    } as const
}
export const updateProfileAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/UPDATE_PROFILE',
        payload
    } as const
}
export const logoutAC = () => {
    return {
        type: 'auth/LOG_OUT'
    } as const
}

// TCs
export const authMeTC = (): RootThunkType => async (dispatch) => {
    setAppStatusAC('loading')
    try {
        const res = await authAPI.me()
        dispatch(authMeAC(res.data))
    } catch (e) {
        //Ignore auth me errors
    } finally {
        setAppStatusAC('idle')
        dispatch(setAppIsInitializedAC(true))
    }
}

export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(setLoginDataAC(res.data))
        dispatch(setAppSuccessAC('You are sign in successfully'))
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
        dispatch(logoutAC())
        dispatch(setAppSuccessAC('You are log out successfully'))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const forgotPassTC = ({email}: { email: string }): RootThunkType<Promise<boolean>> => async (dispatch) => {
    // replace url in href to your gh-page address
    const message = {'message': '<div style="padding: 15px; font-weight: bold">\n Trouble with sign in? <br>\n There is easy way to restore your password. <br>\n Just click on link below and follow the instructions. We’ll have you up and running in no time.  <br>\n \n <a href="https://ticket1201.github.io/cards_quiz/#/set-new-password/$token$">Link</a><br>\n If you did not make this request then please ignore this email.\n</div>'}

    dispatch(setAppStatusAC('loading'))

    try {
        await authAPI.forgotPassword({email, ...message})
        return true
    } catch (e: any) {
        errorUtils(e, dispatch)
        return false
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const setNewPassTC = (data: SetPasswordDataType): RootThunkType<Promise<boolean>> => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.setNewPassword(data)
        dispatch(setAppSuccessAC('You are successfully reset password'))
        return true
    } catch (e: any) {
        errorUtils(e, dispatch)
        return false
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const registerTC = (data: RegisterParamsType): RootThunkType<Promise<boolean>> => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.register(data)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('You are successfully registered'))
        return true
    } catch (e: any) {
        dispatch(setAppStatusAC('failed'))
        errorUtils(e, dispatch)
        return false
    }
}

export const updateProfileTC = (data: UpdateProfileDataType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.updateProfile(data)
        dispatch(updateProfileAC(res.data.updatedUser))
        dispatch(setAppSuccessAC('Profile updated successfully'))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}