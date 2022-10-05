const initialState = {
    _id: '',
    cardsPack_id: '',
    name: '',
    question: '',
    answer: '',
    openAddPackModal: false,
    openEditPackModal: false,
    openDelPackModal: false,
    openAddCardModal: false,
    openEditCardModal: false,
    openDelCardModal: false
}

export type ModalInitialStateType = typeof initialState

export const modalReducer = (state: ModalInitialStateType = initialState, action: ModalActionType): ModalInitialStateType => {
    switch (action.type) {
        case 'modal/OPEN-MODAL':
            return {...state, ...action.payload}
        case 'modal/CLOSE-MODAL':
            return {
                ...state,
                _id: '',
                cardsPack_id: '',
                name: '',
                question: '',
                answer: '',
                openAddPackModal: false,
                openEditPackModal: false,
                openDelPackModal: false,
                openAddCardModal: false,
                openEditCardModal: false,
                openDelCardModal: false
            }
        default:
            return state
    }
}

//types
type ModalStateDataType = Partial<ModalInitialStateType>
type ModalActionType =
    ReturnType<typeof openModalAC>
    | ReturnType<typeof closeModalAC>

//ACs
export const openModalAC = (payload: ModalStateDataType) => {
    return {
        type: 'modal/OPEN-MODAL',
        payload
    } as const
}

export const closeModalAC = () => {
    return {
        type: 'modal/CLOSE-MODAL'
    } as const
}
