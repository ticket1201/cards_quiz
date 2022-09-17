
type InitialStateType = {
    _id: string | null;
    email: string | null;
    name: string | null;
    avatar?: string | null;
    publicCardPacksCount: number | null;
}

const initialState:InitialStateType = {
    _id: null,
    email: 'null',
    name: 'null',
    avatar: 'null',
    publicCardPacksCount: null
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