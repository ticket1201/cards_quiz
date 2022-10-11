import {RootStateType} from "../../app/store";

const initialState = {
    packName: undefined as string | undefined,
    user_id: undefined as string | undefined,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    sortPacks: undefined as string | undefined,
    cardsPack_id: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    cardAnswer: undefined as string | undefined,
    sortCards: undefined as string | undefined,

    page: 1 as number | undefined,
    pageCount: 10 as number | undefined,
}

export  type SearchInitialStateType = typeof initialState
export const searchReducer = (state: SearchInitialStateType = initialState, action: SearchActionType): SearchInitialStateType => {
    switch (action.type) {
        case 'search/SEARCH_PACKS_BY_NAME':
        case 'search/SET_PACKS_BY_OWNER':
        case 'search/SET_RANGE':
            return {...state, ...action.payload}
        case 'search/CLEAR_FILTERS':
            return {
                packName: undefined,
                user_id: undefined,
                min: undefined,
                max: undefined,
                cardAnswer: undefined,
                cardQuestion: undefined,
                sortCards: undefined,
                cardsPack_id: undefined,
                sortPacks: undefined,
                page: 1,
                pageCount: 10
            }
        default:
            return state
    }
}

// selector
export const getSearchParams = (state: RootStateType): SearchInitialStateType => state.search;

//types
export type SearchActionType =
    | ReturnType<typeof searchPacksByNameAC>
    | ReturnType<typeof setPacksByOwnerAC>
    | ReturnType<typeof setRangeAC>
    | ReturnType<typeof clearFiltersAC>

// ACs
export const searchPacksByNameAC = (packName: string) => {
    return {
        type: 'search/SEARCH_PACKS_BY_NAME',
        payload: {packName}
    } as const
}
export const setPacksByOwnerAC = (user_id: string | undefined = undefined) => {
    return {
        type: 'search/SET_PACKS_BY_OWNER',
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

