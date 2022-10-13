import {RootStateType} from "../../app/store";
import {SortNameType} from "../SearchBar/search-constants";

const initialState = {
    // min: null as number | null,
    // max: null as number | null,
    cardsPack_id: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    cardAnswer: undefined as string | undefined,
    sortCards: undefined as string | undefined,

    page: null as number | null,
    pageCount: null as number | null,
}

export  type SearchCardInitialStateType = typeof initialState
export const cardSearchReducer = (state: SearchCardInitialStateType = initialState, action: SearchActionType): SearchCardInitialStateType => {
    switch (action.type) {
        case 'searchCard/SEARCH_CARDS_BY_QUESTION': {
            let {cardQuestion} = action.payload
            if (!cardQuestion) {
                cardQuestion = undefined
            }

            return {...state, cardQuestion}
        }
        case "searchCard/SET_SORT_PARAMS": {
            if (action.payload.sortName) {
                return {
                    ...state,
                    [action.payload.sortName]: action.payload.sortValue
                }
            }
            return state
        }
        case 'searchCard/SET_PAGE':
        case 'searchCard/SET_PAGE_COUNT':
        case 'searchCard/SET_ALL':
            return {...state, ...action.payload}
        /*case 'searchCard/CLEAR_FILTERS':
            return {
                // min: null,
                // max: null,
                cardAnswer: undefined,
                cardQuestion: undefined,
                sortCards: undefined,
                cardsPack_id: undefined,
                page: null,
                pageCount: null,
            }*/
        default:
            return state
    }
}

// selector
export const selectSearchCardParams = (state: RootStateType): SearchCardInitialStateType => state.cardSearch;

//types
export type SearchActionType =
    | ReturnType<typeof searchCardsByQuestionAC>
    // | ReturnType<typeof searchByRangeAC>
    | ReturnType<typeof setCardPageAC>
    | ReturnType<typeof setCardPageCountAC>
    | ReturnType<typeof setCardSortParamsAC>
    // | ReturnType<typeof clearCardSearchFiltersAC>
    | ReturnType<typeof setCardAllAC>

// ACs
export const searchCardsByQuestionAC = (cardQuestion: string | undefined) => {
    return {
        type: 'searchCard/SEARCH_CARDS_BY_QUESTION',
        payload: {cardQuestion}
    } as const
}
/*export const searchByRangeAC = (min: number | null, max: number | null, minCardsCount: number, maxCardsCount: number) => {
    return {
        type: 'searchCard/SEARCH_BY_RANGE',
        payload: {min, max, minCardsCount, maxCardsCount}
    } as const
}*/
export const setCardPageAC = (page: number | null) => {
    return {
        type: 'searchCard/SET_PAGE',
        payload: {page}
    } as const
}
export const setCardPageCountAC = (pageCount: number | null) => {
    return {
        type: 'searchCard/SET_PAGE_COUNT',
        payload: {pageCount}
    } as const
}
export const setCardSortParamsAC = (sortName: SortNameType, sortValue: string | undefined) => {
    return {
        type: 'searchCard/SET_SORT_PARAMS',
        payload: {sortName, sortValue}
    } as const
}
/*export const clearCardSearchFiltersAC = () => {
    return {
        type: 'searchCard/CLEAR_FILTERS'
    } as const
}*/
export const setCardAllAC = (all: any) => {
    return {
        type: 'searchCard/SET_ALL',
        payload: all
    } as const
}

