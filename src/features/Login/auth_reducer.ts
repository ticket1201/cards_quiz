
type InitialStateType = {
    id: string
}

const initialState:InitialStateType = {
    id: ''
}

type AuthMeACType = ReturnType<typeof AuthMeAC>
type ActionsType = AuthMeACType

export const authReducer = (state = initialState, action: ActionsType): any => {
    switch (action.type) {
        case 'AUTH_ME':
            return state
        default :
            return state
    }
}

const AuthMeAC = (id:string) => {
    return {
        type: 'AUTH_ME',
        payload:{
            id
        }
    } as const
}