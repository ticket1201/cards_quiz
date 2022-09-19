const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    success: null as null | string,
    isInitialized: false as boolean
}

export type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
        case 'APP/SET-SUCCESS':
        case 'APP/SET-STATUS':
        case 'APP/SET-IS-INITIALIZED':
            return {
                ...state,
                ...action.payload
            }
        default :
            return state
    }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppSuccessActionType = ReturnType<typeof setAppSuccessAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>
export type AppActionType =
    SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppIsInitializedActionType
    | SetAppSuccessActionType


// ACs
export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}
export const setAppSuccessAC = (success: null | string) => {
    return {
        type: 'APP/SET-SUCCESS',
        payload: {
            success
        }
    } as const
}
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}
export const setAppIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}