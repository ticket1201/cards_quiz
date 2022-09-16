
export const appReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        default :
            return state
    }
}

//types

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
