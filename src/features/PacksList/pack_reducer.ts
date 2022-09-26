import {
    cardsAPI,
    CreatePackDataType,
    GetPacksParamsType,
    getPacksResponseType,
    PackDataType,
    UpdatePackDataType
} from '../../api/api';
import {RootThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from '../../common/utils/error-utils';
import {universalPacksCardsTC} from '../../common/utils/universalPacksCardsTC';


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

export const createPackTC = (data:CreatePackDataType) => universalPacksCardsTC('packs', cardsAPI.createPack, data)

export const updatePackTC = (data:UpdatePackDataType) => universalPacksCardsTC('packs', cardsAPI.updatePack, data)

export const deletePackTC = (id: string) => universalPacksCardsTC('packs', cardsAPI.deletePack, id)

