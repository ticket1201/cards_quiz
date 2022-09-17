import {RootThunkType} from '../../app/store';
import {RegisterFormType} from './Registration/Registration';
import {authAPI} from '../../api/api';
import {setAppStatusAC} from '../../app/app_reducer';

const initialState = {
    id: ''
}

type InitialStateType = typeof initialState

type AuthMeACType = ReturnType<typeof AuthMeAC>
type RegisterACType = ReturnType<typeof registerAC>
type ActionsType = AuthMeACType | RegisterACType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/AUTH_ME':
            return state
        case 'AUTH/REGISTER':
            return state
        default :
            return state
    }
}

export const AuthMeAC = (id: string) => {
    return {
        type: 'AUTH/AUTH_ME',
        payload: {
            id
        }
    } as const
}

export const registerAC = () => {
    return {
        type: 'AUTH/REGISTER',
    } as const
}

export const registerTC = (data: RegisterFormType): RootThunkType<Promise<any>> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.register(data)
        .then(() => {
            // console.log('register, ', res)
            dispatch(setAppStatusAC('succeeded'))
            dispatch(registerAC())
        })
    /*.catch(e => {
        console.log('register catch, e = ', e)
    })*/
}
