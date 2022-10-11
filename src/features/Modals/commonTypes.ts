/*export type CommonModalStateType = {
    _id: string
    title: string
    cardsPack_id: string
    name: string
    question: string
    answer: string
    private?: boolean
    openAddPackModal?: boolean
    openEditPackModal?: boolean
    openDelPackModal?: boolean
    openAddCardModal?: boolean
    openEditCardModal?: boolean
    openDelCardModal?: boolean
}*/

export const commonModalState = {
    _id: '',
    cardsPack_id: '',
    name: '',
    private: false as boolean | undefined,
    question: '',
    answer: '',
    title: '',
    packCover: '',
    questionURL: '',
    answerURL: '',
    openAddPackModal: false as boolean | undefined,
    openEditPackModal: false as boolean | undefined,
    openDelPackModal: false as boolean | undefined,
    openAddCardModal: false as boolean | undefined,
    openEditCardModal: false as boolean | undefined,
    openDelCardModal: false
}

export type CommonModalStateType = typeof commonModalState