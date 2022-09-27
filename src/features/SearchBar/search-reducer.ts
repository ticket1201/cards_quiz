const initialState = {
    packName: undefined as string | undefined,
    user_id: undefined as string | undefined,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    isReset: false
}

export  type SearchInitialStateType = typeof initialState
export const searchReducer = (state: SearchInitialStateType = initialState, action: SearchActionType): SearchInitialStateType => {
    switch (action.type) {
        case 'search/SEARCH_PACKS':
        case 'search/SORT_PACKS_BY_OWNER':
        case 'search/SET_RANGE':
            return {...state, ...action.payload}
        case 'search/CLEAR_FILTERS':
            return {packName: '', user_id: '', min: undefined, max: undefined, isReset: true}
        default:
            return state
    }
}

//types
export type SearchActionType =
    | ReturnType<typeof searchPacksAC>
    | ReturnType<typeof sortPacksByOwnerAC>
    | ReturnType<typeof setRangeAC>
    | ReturnType<typeof clearFiltersAC>

// ACs
export const searchPacksAC = (packName: string) => {
    return {
        type: 'search/SEARCH_PACKS',
        payload: {packName}
    } as const
}
export const sortPacksByOwnerAC = (user_id: string | undefined = undefined) => {
    return {
        type: 'search/SORT_PACKS_BY_OWNER',
        payload: {user_id}
    } as const
}
export const setRangeAC = (min: number, max: number) => {
    return {
        type: 'search/SET_RANGE',
        payload: {min, max}
    } as const
}
export const clearFiltersAC = () => {
    return {
        type: 'search/CLEAR_FILTERS'
    } as const
}

