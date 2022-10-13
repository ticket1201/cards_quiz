import {RootStateType} from "../../app/store";
import {SortNameType} from "../SearchBar/search-constants";

const initialState = {
    packName: undefined as string | undefined,
    user_id: undefined as string | undefined,
    min: null as number | null,
    max: null as number | null,
    sortPacks: undefined as string | undefined,

    page: null as number | null,
    pageCount: null as number | null,
}

export  type SearchPackInitialStateType = typeof initialState
export const packSearchReducer = (state: SearchPackInitialStateType = initialState, action: SearchActionType): SearchPackInitialStateType => {
    switch (action.type) {
        case 'searchPack/SEARCH_PACKS_BY_NAME': {
            let {packName} = action.payload
            if (!packName) {
                packName = undefined
            }

            return {...state, packName}
        }
        case 'searchPack/SEARCH_PACKS_BY_OWNER': {
            return {...state, ...action.payload}
        }
        case 'searchPack/SEARCH_BY_RANGE': {
            let {min, max, minCardsCount, maxCardsCount} = action.payload
            if (min === minCardsCount) {
                min = null
            }
            if (max === maxCardsCount) {
                max = null
            }

            return {...state, min, max}
        }
        case "searchPack/SET_SORT_PARAMS": {
            if (action.payload.sortName) {
                return {
                    ...state,
                    [action.payload.sortName]: action.payload.sortValue
                }
            }
            return state
        }
        case 'searchPack/SET_PAGE':
        case 'searchPack/SET_PAGE_COUNT':
        case 'searchPack/SET_ALL':
            return {...state, ...action.payload}
        case 'searchPack/CLEAR_FILTERS':
            return {
                packName: undefined,
                user_id: undefined,
                min: null,
                max: null,
                sortPacks: undefined,
                page: null,
                pageCount: null,
            }
        default:
            return state
    }
}

// selector
export const selectSearchPackParams = (state: RootStateType): SearchPackInitialStateType => state.packSearch;

//types
export type SearchActionType =
    | ReturnType<typeof searchPacksByNameAC>
    | ReturnType<typeof searchPacksByOwnerAC>
    | ReturnType<typeof searchPacksByRangeAC>
    | ReturnType<typeof setPackPageAC>
    | ReturnType<typeof setPackPageCountAC>
    | ReturnType<typeof setPackSortParamsAC>
    | ReturnType<typeof clearPackSearchFiltersAC>
    | ReturnType<typeof setPackAllAC>

// ACs
export const searchPacksByNameAC = (packName: string | undefined) => {
    return {
        type: 'searchPack/SEARCH_PACKS_BY_NAME',
        payload: {packName}
    } as const
}
export const searchPacksByOwnerAC = (user_id: string | undefined = undefined) => {
    return {
        type: 'searchPack/SEARCH_PACKS_BY_OWNER',
        payload: {user_id}
    } as const
}
export const searchPacksByRangeAC = (min: number | null, max: number | null, minCardsCount: number, maxCardsCount: number) => {
    return {
        type: 'searchPack/SEARCH_BY_RANGE',
        payload: {min, max, minCardsCount, maxCardsCount}
    } as const
}
export const setPackPageAC = (page: number | null) => {
    return {
        type: 'searchPack/SET_PAGE',
        payload: {page}
    } as const
}
export const setPackPageCountAC = (pageCount: number | null) => {
    return {
        type: 'searchPack/SET_PAGE_COUNT',
        payload: {pageCount}
    } as const
}
export const setPackSortParamsAC = (sortName: SortNameType, sortValue: string | undefined) => {
    return {
        type: 'searchPack/SET_SORT_PARAMS',
        payload: {sortName, sortValue}
    } as const
}
export const clearPackSearchFiltersAC = () => {
    return {
        type: 'searchPack/CLEAR_FILTERS'
    } as const
}
export const setPackAllAC = (all: any) => {
    return {
        type: 'searchPack/SET_ALL',
        payload: all
    } as const
}

