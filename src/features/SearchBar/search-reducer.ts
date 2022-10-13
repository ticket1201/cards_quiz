// import {RootStateType} from "../../app/store";
import {SortNameType} from "./search-constants";

const initialState = {
    packName: undefined as string | undefined,
    user_id: undefined as string | undefined,
    min: null as number | null,
    max: null as number | null,
    sortPacks: undefined as string | undefined,
    cardsPack_id: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    cardAnswer: undefined as string | undefined,
    sortCards: undefined as string | undefined,

    page: null as number | null,
    pageCount: null as number | null,
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
        case 'search/SEARCH_CARDS_BY_QUESTION': {
            let {cardQuestion} = action.payload
            if (!cardQuestion) {
                cardQuestion = undefined
            }

            return {...state, cardQuestion}
        }
        case 'search/SEARCH_PACKS_BY_OWNER': {
            return {...state, ...action.payload}
        }
        case 'search/SEARCH_BY_RANGE': {
            let {min, max, minCardsCount, maxCardsCount} = action.payload
            if (min === minCardsCount) {
                min = null
            }
            if (max === maxCardsCount) {
                max = null
            }

            return {...state, min, max}
        }
        case "search/SET_SORT_PARAMS": {
            if (action.payload.sortName) {
                return {
                    ...state,
                    [action.payload.sortName]: action.payload.sortValue
                }
            }
            return state
        }
        case 'search/SET_PAGE':
        case 'search/SET_PAGE_COUNT':
        case 'search/SET_ALL':
            return {...state, ...action.payload}
        case 'search/CLEAR_FILTERS':
            return {
                packName: undefined,
                user_id: undefined,
                min: null,
                max: null,
                cardAnswer: undefined,
                cardQuestion: undefined,
                sortCards: undefined,
                cardsPack_id: undefined,
                sortPacks: undefined,
                page: null,
                pageCount: null,
            }
        default:
            return state
    }
}

// selector
// export const selectSearchParams = (state: RootStateType): SearchInitialStateType => state.search;

//types
export type SearchActionType =
    | ReturnType<typeof searchPacksByNameAC>
    | ReturnType<typeof searchCardsByQuestionAC>
    | ReturnType<typeof searchPacksByOwnerAC>
    | ReturnType<typeof searchByRangeAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSortParamsAC>
    | ReturnType<typeof clearSearchFiltersAC>
    | ReturnType<typeof setAllAC>

// ACs
export const searchPacksByNameAC = (packName: string | undefined) => {
    return {
        type: 'search/SEARCH_PACKS_BY_NAME',
        payload: {packName}
    } as const
}
export const searchCardsByQuestionAC = (cardQuestion: string | undefined) => {
    return {
        type: 'search/SEARCH_CARDS_BY_QUESTION',
        payload: {cardQuestion}
    } as const
}
export const searchPacksByOwnerAC = (user_id: string | undefined = undefined) => {
    return {
        type: 'search/SEARCH_PACKS_BY_OWNER',
        payload: {user_id}
    } as const
}
export const searchByRangeAC = (min: number | null, max: number | null, minCardsCount: number, maxCardsCount: number) => {
    return {
        type: 'search/SEARCH_BY_RANGE',
        payload: {min, max, minCardsCount, maxCardsCount}
    } as const
}
export const setPageAC = (page: number | null) => {
    return {
        type: 'search/SET_PAGE',
        payload: {page}
    } as const
}
export const setPageCountAC = (pageCount: number | null) => {
    return {
        type: 'search/SET_PAGE_COUNT',
        payload: {pageCount}
    } as const
}
export const setSortParamsAC = (sortName: SortNameType, sortValue: string | undefined) => {
    return {
        type: 'search/SET_SORT_PARAMS',
        payload: {sortName, sortValue}
    } as const
}
export const clearSearchFiltersAC = () => {
    return {
        type: 'search/CLEAR_FILTERS'
    } as const
}

export const setAllAC = (all: any) => {
    return {
        type: 'search/SET_ALL',
        payload: all
    } as const
}

