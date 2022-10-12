import {RootStateType} from "../../app/store";

export const pageDefault = 1;
export const pageCountDefault = 10;

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

    page: pageDefault as number | undefined,
    pageCount: pageCountDefault as number | undefined,
}

export  type SearchInitialStateType = typeof initialState
export const searchReducer = (state: SearchInitialStateType = initialState, action: SearchActionType): SearchInitialStateType => {
    switch (action.type) {
        case 'search/SEARCH_PACKS_BY_NAME': {
            let {packName} = action.payload
            if (!packName) {
                packName = undefined
            }

            return {...state, packName}
        }
        case 'search/SEARCH_PACKS_BY_OWNER': {
            return {...state, ...action.payload}
        }
        case 'search/SEARCH_BY_RANGE': {
            let {min, max, minCardsCount, maxCardsCount} = action.payload
            if (min === minCardsCount) {
                min = undefined
            }
            if (max === maxCardsCount) {
                max = undefined
            }

            return {...state, min, max}
        }
        case 'search/SET_PAGE':
        case 'search/SET_PAGE_COUNT':
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
    | ReturnType<typeof searchPacksByOwnerAC>
    | ReturnType<typeof searchByRangeAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof clearSearchFiltersAC>

// ACs
export const searchPacksByNameAC = (packName: string | undefined) => {
    return {
        type: 'search/SEARCH_PACKS_BY_NAME',
        payload: {packName}
    } as const
}
export const searchPacksByOwnerAC = (user_id: string | undefined = undefined) => {
    return {
        type: 'search/SEARCH_PACKS_BY_OWNER',
        payload: {user_id}
    } as const
}
export const searchByRangeAC = (min: number | undefined, max: number | undefined, minCardsCount: number, maxCardsCount: number) => {
    return {
        type: 'search/SEARCH_BY_RANGE',
        payload: {min, max, minCardsCount, maxCardsCount}
    } as const
}
export const setPageAC = (page: number | undefined) => {
    return {
        type: 'search/SET_PAGE',
        payload: {page}
    } as const
}
export const setPageCountAC = (pageCount: number | undefined) => {
    return {
        type: 'search/SET_PAGE_COUNT',
        payload: {pageCount}
    } as const
}
export const clearSearchFiltersAC = () => {
    return {
        type: 'search/CLEAR_FILTERS'
    } as const
}

