export type CommonModalStateType = {
    _id: string
    title: string
    cardsPack_id?: string
    name?: string
    private?: boolean
    question?: string
    answer?: string
    openAddPackModal?: boolean
    openEditPackModal?: boolean
    openDelPackModal?: boolean
    openAddCardModal?: boolean
    openEditCardModal?: boolean
    openDelCardModal?: boolean
}