export type CommonModalStateType = {
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
}