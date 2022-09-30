import {
    cardsAPI,
    CreatePackDataType,
    GetPacksParamsType,
    getPacksResponseType,
    PackDataType,
    UpdatePackDataType
} from '../../api/api';
import {RootStateType, RootThunkType} from '../../app/store';
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
    isToggled: false
}

export const packReducer = (state: PacksInitialStateType = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'PACK/SET_CHANGED':
            return {...state, isToggled: !state.isToggled}
        case 'PACK/SET_PACKS':
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks.map(el => ({
                    ...el, id: el._id, actions: el.user_id === action.authId
                }))}
        default :
            return state
    }
}

//types
export type PacksInitialStateType = typeof initialState
export type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setPacksIsChangedAC>

// ACs
export const setPacksAC = (payload: getPacksResponseType, authId?:string) => {
    return {
        type: 'PACK/SET_PACKS',
        payload, authId
    } as const
}
export const setPacksIsChangedAC = () => {
    return {
        type: 'PACK/SET_CHANGED',
    } as const
}

//TCs
export const getPacksTC = (data: GetPacksParamsType): RootThunkType => async (dispatch, getState:()=>RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getPacks(data)
        dispatch(setPacksAC(res.data, getState().auth._id))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const createPackTC = (data: CreatePackDataType) => universalPacksCardsTC('packs', cardsAPI.createPack, data)

export const updatePackTC = (data: UpdatePackDataType) => universalPacksCardsTC('packs', cardsAPI.updatePack, data)

export const deletePackTC = (_id: string) => universalPacksCardsTC('packs', cardsAPI.deletePack, _id)

