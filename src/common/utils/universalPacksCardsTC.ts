import {RootThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app_reducer';
import {errorUtils} from './error-utils';
import {setCardsIsChangedAC} from '../../features/PackPage/cards_reducer';
import {setPacksIsChangedAC} from '../../features/PacksList/pack_reducer';

type ReducerNameType = 'packs' | 'cards'


export const universalPacksCardsTC = <T>(reducerName: ReducerNameType, method: (model: T) => void, model: T): RootThunkType => async (dispatch) => {
    let ActionCreator

    switch (reducerName){
        case 'packs':
            ActionCreator = () => setPacksIsChangedAC({isChanged: true})
            break
        case 'cards':
            ActionCreator = () => setCardsIsChangedAC({isChanged: true})
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