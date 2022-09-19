import {RootThunkType} from '../../app/store';
import {authAPI, SetPasswordDataType} from '../../api/api';

type InitialStateType = {
    _id: string | null;
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

type ActionsType =
  | ReturnType<typeof AuthMeAC>
  | ReturnType<typeof LogOutAC>

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/AUTH_ME':
            return state
        case "AUTH/LOG_OUT":
            return {_id:''} as InitialStateType
        default :
            return state
    }
}

const AuthMeAC = (id:string) => {
    return {
        type: 'AUTH/AUTH_ME',
        payload:{
            id
        }
    } as const
}

const LogOutAC = () => {
    return{
        type: 'AUTH/LOG_OUT'
    } as const
}



export const LogoutTC = ():RootThunkType => (dispatch) => {
   dispatch(LogOutAC())
}

export const ForgotPassTC = ({email}:{email:string}):RootThunkType => async (dispatch) => {
    try {
        let res = await authAPI.forgotPassword({email, ...{"message":"<div style=\"padding: 15px\">\npassword recovery link: \n<a href='http://localhost:3000/#/set-new-password/$token$'>\nlink</a>\n</div>"}})
    }
    catch (e){
        console.log(e)
    }
}


export const setNewPassTC = (data: SetPasswordDataType):RootThunkType => async (dispatch) => {
    try {
        let res = await authAPI.setNewPassword(data)
    }
    catch (e){
        console.log(e)
    }
}




