import {RootStateType, RootThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from './error-utils';
import {setCardsAC} from '../../features/PackPage/cards_reducer';
import {setPacksAC} from '../../features/PacksList/pack_reducer';

type ReducerNameType = 'packs' | 'cards'


export const universalPacksCardsTC = <T>(reducerName: ReducerNameType, method: (model: T) => void, model: T): RootThunkType => async (dispatch, getState: () => RootStateType) => {
    let ActionCreator

    switch (reducerName){
        case 'packs':
            ActionCreator = () => setPacksAC({
                ...getState().packs, cardPacksTotalCount: getState().packs.cardPacksTotalCount + 1
            })
            break
        case 'cards':
            ActionCreator = () => setCardsAC({
                ...getState().cards, cardsTotalCount: getState().cards.cardsTotalCount + 1
            })
            break
    }

    setAppStatusAC('loading')
    try {
        await method(model)
        dispatch(ActionCreator())
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        setAppStatusAC('idle')
    }
}