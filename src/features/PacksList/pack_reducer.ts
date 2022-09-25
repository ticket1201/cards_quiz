import {cardsAPI, CreatePackDataType, GetPacksParamsType, getPacksResponseType, PackDataType} from '../../api/api';
import {RootStateType, RootThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from '../../common/utils/error-utils';


const initialState = {
    cardPacks: [] as Array<PackDataType>,
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
}

export const packReducer = (state: PacksInitialStateType = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'PACK/SET_PACKS':
            return {...state, ...action.payload}
        default :
            return state
    }
}

//types
export type PacksInitialStateType = typeof initialState
export type PacksActionType =
    | ReturnType<typeof setPacksAC>

// ACs
export const setPacksAC = (payload: getPacksResponseType) => {
    return {
        type: 'PACK/SET_PACKS',
        payload
    } as const
}

//TCs

export const getPacksTC = (data:GetPacksParamsType): RootThunkType => async (dispatch) => {
    setAppStatusAC('loading')
    try {
        const res = await cardsAPI.getPacks(data)
        dispatch(setPacksAC(res.data))
    } catch (e:any) {
        errorUtils(e, dispatch)
    } finally {
        setAppStatusAC('idle')
    }
}

export const createPackTC = (data:CreatePackDataType): RootThunkType => async (dispatch,getState: () => RootStateType) => {
    setAppStatusAC('loading')
    try {
        debugger
        await cardsAPI.createPack(data)
        dispatch(setPacksAC({
            ...getState().packs, cardPacksTotalCount: getState().packs.cardPacksTotalCount + 1
        }))
    } catch (e:any) {
        errorUtils(e, dispatch)
    } finally {
        setAppStatusAC('idle')
    }
}
