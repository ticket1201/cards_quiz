import {
    CardDataType, CardRequestType,
    cardsAPI, GetCardParamsType,
    getCardsResponseType, UpdateCardRequestType,
} from '../../api/api';
import {RootThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from '../../common/utils/error-utils';
import {universalPacksCardsTC} from '../../common/utils/universalPacksCardsTC';


const initialState = {
    cards: [] as Array<CardDataType>,
    packName: '',
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    isChanged: false
}


export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
        case 'CARDS/SET_CHANGED':
            return {...state, ...action.payload}
        default :
            return state
    }
}

//types
export type CardsInitialStateType = typeof initialState
export type CardsActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsIsChangedAC>

// ACs
export const setCardsAC = (payload: getCardsResponseType) => {
    return {
        type: 'CARDS/SET_CARDS',
        payload
    } as const
}
export const setCardsIsChangedAC = (payload: { isChanged: boolean }) => {
    return {
        type: 'CARDS/SET_CHANGED',
        payload
    } as const
}

//TCs

export const getCardsTC = (data: GetCardParamsType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(data)
        dispatch(setCardsAC(res.data))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setCardsIsChangedAC({isChanged: false}))
        dispatch(setAppStatusAC('idle'))
    }
}

export const createCardTC = (data: CardRequestType) => universalPacksCardsTC('cards', cardsAPI.createCard, data)

export const updateCardTC = (data: UpdateCardRequestType) => universalPacksCardsTC('cards', cardsAPI.updateCard, data)

export const deleteCardTC = (id: string) => universalPacksCardsTC('cards', cardsAPI.deleteCard, id)


